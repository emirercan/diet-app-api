const express = require('express');
const router = express.Router();

const recipeRoutes = require('./recipeRoute');

router.use('/recipe', recipeRoutes);

router.get('/', (req, res) => {
  res.json({ message: 'API Status: 200' });
});

module.exports = router;