const RecipeRepository = require('@repository/recipeRepository');
const AppError = require('@exceptions/AppError');
const RecipeDto = require('@dto/RecipeDto');

const logger = require('@logger');
const { Configuration, OpenAIApi } = require('openai');

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



/*

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function getDietRecipe ({
  disallowedIngredients = [],
  maxCalories = 500,
  region = 'TR',
  userIngredients = [],
} = {}) {
  const prompt = `
  You are an AI that generates diet-friendly recipes in a strictly structured JSON format.

  # Requirements:
  - The recipe must be under ${maxCalories} calories total.
  - It must be a diet-friendly meal.
  - If the user provides ingredients, you can use them.
  - You can also use common household ingredients such as salt, pepper, cooking oil (like sunflower oil), etc.
  - However, do NOT include any of these disallowed ingredients: ${disallowedIngredients.join(', ')}.
  - If the user does NOT provide any diet-friendly ingredients, return an error message in the JSON.
  - Always consider the user's region: if the region is "${region}", incorporate local cuisine elements accordingly.
  - Return your output strictly in a JSON object with the keys:
    "recipeName", "totalCalories", "ingredients", "instructions", "region", "warnings"
  - Make sure to keep the total calories under ${maxCalories}.

  # User Data:
  - Region: ${region}
  - Provided Ingredients: ${userIngredients.join(', ')}
  - Disallowed Ingredients: ${disallowedIngredients.join(', ')}

  # Format:
  {
    "recipeName": "...",
    "totalCalories": ...,
    "ingredients": ["...", "..."],
    "instructions": ["Step 1...", "Step 2..."],
    "region": "...",
    "warnings": ["..."]
  }
  `;

  const response = await openai.createChatCompletion({
    model: 'gpt-4', // or "gpt-3.5-turbo"
    messages: [
      {
        role: 'system',
        content: prompt,
      },
    ],
    temperature: 0.7,
  });

  const assistantMessage = response.data.choices[0].message?.content;

  try {
    const recipeJSON = JSON.parse(assistantMessage);
    return recipeJSON;
  } catch (err) {
    logger.error('JSON parse error:', err);
    return { error: 'Invalid JSON response from model', rawContent: assistantMessage };
  }
}
*/
module.exports = {
  createRecipe,
  getRecipeById
};