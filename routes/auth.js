const router = require('express').Router();
const passport = require('passport');

router.get('/google', /* #swagger.ignore = true */ passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        //#swagger.ignore = true
        res.redirect('/profile');
    }
);

router.get('/logout', (req, res) => {
    req.logout(() => {
        //#swagger.ignore = true
        res.redirect('/profile');
    });
});

module.exports = router;