const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags = ['Hello world!'];
    //#swagger.ignore = true
    res.send('Hello world');
});
router.use('/movies', require('./movies'));
router.use('/directors', require('./directors'));
router.use('/categories', require('./categories'));
router.use('/cast', require('./cast'));

router.use('/auth', require('./auth'));

router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({ user: req.user });
    } else {
        res.status(401).json({ message: "You don't have access" });
    }
});

module.exports = router;