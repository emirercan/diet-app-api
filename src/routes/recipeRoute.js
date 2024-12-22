const { Router } = require('express');
const recipeController = require('@controllers/recipeController');
const validateRecipe = require('@validations/recipeValidation');

const router = Router();

router.post('/', validateRecipe, recipeController.createRecipe);

//router.post('/ai', recipeController.createRecipeWithAI);

router.get('/:id', recipeController.getRecipeById);


module.exports = router;
