const express = require('express');
const router = express.Router();

const createRecipe = require('../controllers/recipe')
const getRecipes = require('../controllers/recipe')

router.post('/', createRecipe.create)
router.get('/', getRecipes.get )

module.exports = router;