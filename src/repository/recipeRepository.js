const Recipe = require('@models/recipeModel');

const RecipeRepository = {
  async create (data) {
    return await Recipe.create(data);
  },
  async findById (id) {
    return await Recipe.findById(id);
  },
  async findAll () {
    return await Recipe.find();
  },
  async update (id, data) {
    return await Recipe.findByIdAndUpdate(id, data, { new: true });
  },
  async delete (id) {
    return await Recipe.findByIdAndDelete(id);
  },
};

module.exports = RecipeRepository;


