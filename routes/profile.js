const router = require('express').Router();
const ensureAuth = require('../auth/ensureAuth');

router.get('/profile', (req, res) => {
    console.log('👤 isAuthenticated:', req.isAuthenticated());
    console.log('📦 session:', req.session);
    console.log('👤 user:', req.user);

    if (req.isAuthenticated()) {
        res.status(200).json({ user: req.user });
    } else {
        res.status(401).json({ message: "You don't have access" });
    }
});



module.exports = router;
