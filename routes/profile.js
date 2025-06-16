const router = require('express').Router();
const ensureAuth = require('../auth/ensureAuth');

router.get('/', (req, res) => {
    console.log('🔍 Profile route accessed');
    if (req.isAuthenticated()) {
        res.status(200).json({ user: req.user });
    } else {
        res.status(401).json({ message: "You don't have access" });
    }
});

module.exports = router;