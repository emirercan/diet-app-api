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
    throw new AppError('AI response is not a valid JSON format',500);
  }

  try {
    return await RecipeRepository.create(parsedData);
  } catch (validationError) {
    throw new AppError(`Database Validation Error in Create Recipe: ${validationError.message}`, 500);
  }
}


module.exports = {
  createRecipe,
  createRecipeWithAI,
  getRecipeById
};