const router = require('express').Router();

router.use('/', /* #swagger.ignore = true */ require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags = ['Hello world!'];
    //#swagger.ignore = true
    res.send('Hello world');
});
router.use('/movies', require('./movies'));
router.use('/directors', require('./directors'));
router.use('/categories', require('./categories'));
router.use('/cast', require('./cast'));

router.use('/auth', /* #swagger.ignore = true */ require('./auth'));

router.use('/profile', require('./profile'));

module.exports = router;