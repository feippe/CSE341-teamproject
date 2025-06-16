const express = require('express');
const router = express.Router();
const ensureAuth = require('../auth/ensureAuth');

const castController = require('../controllers/cast');
const { castValidation, validate } = require('../validator');

router.get('/', castController.getAllCast);
router.get('/:id', castController.getCast);

router.post('/', ensureAuth, castValidation(), validate, castController.createCast);
router.put('/:id', ensureAuth, castValidation(), validate, castController.updateCast);
router.delete('/:id', ensureAuth, castController.deleteCast);

module.exports = router;
