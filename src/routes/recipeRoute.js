const { Router } = require('express');
const recipeController = require('@controllers/recipeController');
const { validateCreateRecipeRequest, validateCreateRecipeWithAIRequest } = require('@validations/recipeValidation');

const router = Router();

router.post('/', validateCreateRecipeRequest, recipeController.createRecipe);

router.post('/ai', validateCreateRecipeWithAIRequest, recipeController.createRecipeWithAI);

router.get('/:id', recipeController.getRecipeById);


module.exports = router;
