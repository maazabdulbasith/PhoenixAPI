const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
    try {
        // Get token from header
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                error: "No token provided",
                message: "Please provide an authentication token",
            });
        }

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "your-secret-key"
        );

        // Add user from payload
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            error: "Invalid token",
            message: "Please authenticate with a valid token",
        });
    }
};

module.exports = auth;
