const express = require('express');
const router = express.Router();
const ensureAuth = require('../auth/ensureAuth');

const castController = require('../controllers/cast');
const { castValidationRules, validate } = require('../validator');

router.get('/', castController.getCast);
router.get('/:id', castController.getCastMember);

router.post('/', ensureAuth, castValidationRules(), validate, castController.createCastMember);
router.put('/:id', ensureAuth, castValidationRules(), validate, castController.updateCastMember);
router.delete('/:id', ensureAuth, castController.deleteCastMember);

module.exports = router;
