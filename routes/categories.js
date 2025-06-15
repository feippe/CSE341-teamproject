const express = require('express');
const router = express.Router();
const ensureAuth = require('../auth/ensureAuth');

const categoriesController = require('../controllers/categories');
const { categoryValidation, validate } = require('../validator');

router.get('/', categoriesController.getCategories);
router.get('/:id', categoriesController.getCategory);

router.post('/', ensureAuth, categoryValidation(), validate, categoriesController.createCategory);
router.put('/:id', ensureAuth, categoryValidation(), validate, categoriesController.updateCategory);
router.delete('/:id', ensureAuth, categoriesController.deleteCategory);

module.exports = router;
