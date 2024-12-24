const yup = require('yup');
const AppError = require('@exceptions/AppError');

const createRecipeValidationSchema = yup.object().shape({
  recipeName: yup.string().required('Recipe name is required').min(3, 'Recipe name must be at least 3 characters'),
  totalCalories: yup.number().required('Total calories are required').min(0, 'Total calories cannot be negative'),
  ingredients: yup
    .array()
    .of(yup.string().required('Each ingredient must be a string'))
    .required('Ingredients are required')
    .min(1, 'At least one ingredient is required'),
  instructions: yup
    .array()
    .of(yup.string().required('Each instruction must be a string'))
    .required('Instructions are required')
    .min(1, 'At least one instruction is required'),
  region: yup.string().required('Region is required'),
  warnings: yup.array().of(yup.string()),
});

const createRecipeWithAIValidationSchema = yup.object().shape({
  disallowedIngredients: yup
    .array()
    .of(yup.string().trim().required('Each ingredient must be a string'))
    .default([])
    .optional(),

  maxCalories: yup
    .number()
    .required('Max calories is required')
    .min(0, 'Calories cannot be negative')
    .max(10000, 'Calories must be realistic'),

  region: yup
    .string()
    .required('Region is required')
    .matches(/^[A-Z]{2}$/, 'Region must be a two-letter country code (e.g., TR, US)'),

  userIngredients: yup
    .array()
    .of(yup.string().trim().required('Each user ingredient must be a string'))
    .default([])
    .optional(),
});

const createRecipeImageWithAIValidationSchema = yup.object().shape({
  recipeId: yup
    .string()
    .required('Recipe ID is required')
    .matches(/^[a-fA-F0-9]{24}$/, 'Recipe ID must be a valid MongoDB ObjectId'),
});


const validateCreateRecipeRequest = async (req, res, next) => {
  try {
    await createRecipeValidationSchema.validate(req.body);
    next();
  } catch (error) {
    if (error.name === 'ValidationError') {
      const message = error.errors.join(', ');
      next(new AppError(message, 400));
    }
    next(error);
  }
};


const validateCreateRecipeWithAIRequest = async (req, res, next) => {
  try {
    await createRecipeWithAIValidationSchema.validate(req.body);
    next();
  } catch (error) {
    if (error.name === 'ValidationError') {
      const message = error.errors.join(', ');
      next(new AppError(message, 400));
    }
    next(error);
  }
};

const validateCreateRecipeImageWithAIRequest = async (req, res, next) => {
  try {
    await createRecipeImageWithAIValidationSchema.validate(req.body);
    next();
  } catch (error) {
    if (error.name === 'ValidationError') {
      const message = error.errors.join(', ');
      next(new AppError(message, 400));
    }
    next(error);
  }
};

module.exports = {
  validateCreateRecipeRequest,
  validateCreateRecipeWithAIRequest,
  validateCreateRecipeImageWithAIRequest
};
