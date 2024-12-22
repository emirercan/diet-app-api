class RecipeDto {
  constructor (recipe) {
    this.recipeName = recipe.recipeName;
    this.totalCalories = recipe.totalCalories;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.region = recipe.region;
    this.warnings = recipe.warnings;
    this.createdAt = recipe.createdAt.toISOString();
  }
}

module.exports = RecipeDto;