const RecipeRepository = require('@repository/recipeRepository');
const AppError = require('@exceptions/AppError');
const RecipeDto = require('@dto/RecipeDto');
const openai = require('@ai/openai');
const generetaRecipePrompt = require('@ai/prompt/generateRecipePrompt');
const logger = require('@logger');

async function createRecipe (data) {
  return await RecipeRepository.create(data);
}

async function getRecipeById (id) {
  const recipe = await RecipeRepository.findById(id);

  if (!recipe) {
    throw new AppError(`Recipe with id ${id} not found`, 404);
  }

  return new RecipeDto(recipe);
}

async function createRecipeWithAI (data) {
  const { disallowedIngredients = [], maxCalories = 500, region = 'TR', userIngredients = [] } = data;
  const prompt = generetaRecipePrompt(disallowedIngredients, maxCalories, region, userIngredients);

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo', // or "gpt-3.5-turbo"
    messages: [
      {
        role: 'system',
        content: prompt,
      },
    ],
    temperature: 0.7,
  });

  logger.info('AI response:', response.choices[0].message.content);

  const assistantMessage = response.choices[0].message?.content;

  let parsedData;
  try {
    parsedData = JSON.parse(assistantMessage);
  } catch {
    throw new AppError('AI response is not a valid JSON format', 500);
  }

  parsedData.imagePrompt = parsedData.dallePrompt || '';
  delete parsedData.dallePrompt;

  try {
    return await RecipeRepository.create(parsedData);
  } catch (validationError) {
    throw new AppError(`Database Validation Error in Create Recipe: ${validationError.message}`, 500);
  }
}

async function createRecipeImageWithAI (data) {
  const { recipeId } = data;
  const prompt = await getImagePromptById(recipeId);

  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: prompt,
    n: 1,
    size: '1024x1024',
  });

  if (!response.data[0].url) {
    throw new AppError('AI response does not contain an image URL', 500);
  }

  return response.data[0].url;
}

//Service helper function
async function getImagePromptById (id) {
  const recipe = await RecipeRepository.findById(id, 'imagePrompt');

  if (!recipe) {
    throw new AppError(`Recipe with id ${id} not found`, 404);
  }

  if (!recipe.imagePrompt) {
    throw new AppError(`Image prompt for recipe with id ${id} not found`, 404);
  }

  return recipe.imagePrompt;
}

module.exports = {
  createRecipe,
  getRecipeById,
  createRecipeWithAI,
  createRecipeImageWithAI
};