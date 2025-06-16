function ensureAuth(req, res, next) {
    
    console.log('🛡 Authenticated?', req.isAuthenticated());
    console.log('👤 User:', req.user);
    console.log('📦 Session:', req.session);

    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: "You don't have access" });
}

module.exports = ensureAuth;