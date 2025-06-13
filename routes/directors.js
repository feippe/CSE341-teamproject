const express = require('express');
const router = express.Router();
const ensureAuth = require('../auth/ensureAuth');

const directorsController = require('../controllers/directors');
const { directorValidationRules, validate } = require('../validator');

router.get('/', directorsController.getDirectors);
router.get('/:id', directorsController.getDirector);

router.post('/', ensureAuth, directorValidationRules(), validate, directorsController.createDirector);
router.put('/:id', ensureAuth, directorValidationRules(), validate, directorsController.updateDirector);
router.delete('/:id', ensureAuth, directorsController.deleteDirector);

module.exports = router;
