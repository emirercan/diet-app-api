const recipeService = require('@services/recipeService');

async function createRecipe (req, res, next) {
  try {
    const recipe = await recipeService.createRecipe(req.body);
    res.status(201).json({ success: true, data: recipe });
  } catch (error) {
    next(error);
  }
}

async function getRecipeById (req, res, next) {
  try {
    const recipe = await recipeService.getRecipeById(req.params.id);
    res.status(200).json({ success: true, data: recipe });
  } catch (error) {
    next(error);
  }
}

async function createRecipeWithAI (req, res, next) {
  try {
    const recipe = await recipeService.createRecipeWithAI(req.body);
    res.status(201).json({ success: true, data: recipe });
  } catch (error) {
    next(error);
  }
}

async function createRecipeImageWithAI (req, res, next) {
  try {
    const recipeImageUrl = await recipeService.createRecipeImageWithAI(req.body);
    res.status(201).json({ success: true, data: { recipeImageUrl } });
  } catch (error) {
    next(error);
  }
}

async function detectIngredientsFromImage (req, res, next) {
  try {
    const ingredients = await recipeService.detectIngredientsFromImage(req.file.path);
    res.status(200).json({ success: true, data: { ingredients } });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createRecipe,
  getRecipeById,
  createRecipeWithAI,
  createRecipeImageWithAI,
  detectIngredientsFromImage
};