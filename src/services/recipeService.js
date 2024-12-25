const RecipeRepository = require('@repository/recipeRepository');
const AppError = require('@exceptions/AppError');
const RecipeDto = require('@dto/RecipeDto');
const openai = require('@ai/openai');
const generetaRecipePrompt = require('@ai/prompt/generateRecipePrompt');
const generateDetectIngredientPrompt = require('@ai/prompt/generateDetectIngredientPrompt');
const logger = require('@logger');
const encodeImageToBase64 = require('@utils/encodeImageToBase64');

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

async function detectIngredientsFromImage (filePath) {
  const base64Image = encodeImageToBase64(filePath);
  const prompt = generateDetectIngredientPrompt();

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: prompt},
          {
            type: 'image_url',
            image_url: { url: `data:image/jpeg;base64,${base64Image}` },
          },
        ],
      },
    ],
  });

  const content = response.choices[0].message.content;

  let detectedIngredients;
  try {
    detectedIngredients = JSON.parse(content);
  } catch (error) {
    logger.error('Error parsing detected ingredients:', JSON.stringify(content, null, 2));
    throw new AppError('Invalid response format', 500);
  }

  return detectedIngredients;
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
  createRecipeImageWithAI,
  detectIngredientsFromImage
};