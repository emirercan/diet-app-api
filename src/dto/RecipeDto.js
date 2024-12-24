class RecipeDto {
  constructor (recipe) {
    this.id = recipe._id;
    this.recipeName = recipe.recipeName;
    this.totalCalories = recipe.totalCalories;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.region = recipe.region;
    this.warnings = recipe.warnings;
    this.imageUrl = recipe.imageUrl;
    this.createdAt = recipe.createdAt.toISOString();
  }
}

module.exports = RecipeDto;