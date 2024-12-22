const recipeService = require('@services/recipeService');

async function createRecipe (req, res, next) {
  try {
    const recipe = await recipeService.createRecipe(req.body);
    res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
}

async function getRecipeById (req, res, next) {
  try {
    const recipes = await recipeService.getRecipeById(req.params.id);
    res.json(recipes);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createRecipe,
  getRecipeById
};