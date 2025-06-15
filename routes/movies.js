const express = require('express');
const router = express.Router();
const ensureAuth = require('../auth/ensureAuth');

const moviesController = require('../controllers/movies');

const { movieValidation, validate } = require('../validator.js');

router.get('/', moviesController.getMovies);
router.get('/:id', moviesController.getMovie);

router.post('/', ensureAuth, movieValidation(), validate, moviesController.createMovie);
router.put('/:id', ensureAuth, movieValidation(), validate, moviesController.updateMovie);
router.delete('/:id', ensureAuth, moviesController.deleteMovie);

module.exports = router;