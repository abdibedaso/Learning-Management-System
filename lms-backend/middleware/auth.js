const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
    if (!config.get("requiresAuth")) return next();

    const token = req.header("x-auth-token");
    if (!token) return res.status(401).json({
        "error": {
            "code": "401",
            "message": "Access denied. No token provided."
        }
    });

    try {
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).json({
            "error": {
                "code": "400",
                "message": "Invalid token."
            }
        });
    }
};