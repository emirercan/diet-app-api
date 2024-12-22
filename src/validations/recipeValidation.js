const yup = require('yup');
const AppError = require('@exceptions/AppError');

const recipeValidationSchema = yup.object().shape({
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

const validateRecipe = async (req, res, next) => {
  try {
    await recipeValidationSchema.validate(req.body);
    next();
  } catch (error) {
    if (error.name === 'ValidationError') {
      const message = error.errors.join(', ');
      next(new AppError(400, message));
    }
    next(error);
  }
};

module.exports = validateRecipe;
