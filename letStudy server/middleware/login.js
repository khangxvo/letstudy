const jwt = require('jsonwebtoken');
const config = require('config');

/**
 * Middleware function to handle user login via JWT authentication.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
module.exports = function login(req, res, next) {
    // Retrieve the token from the request header
    const token = req.header('x-auth-token');

    // If no token is provided, return a 401 Unauthorized response
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        // Verify the token using the secret key from the configuration
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));

        // Attach the decoded user information to the request object
        req.user = decoded;

        // Proceed to the next middleware function
        next();
    } catch (ex) {
        // If the token is invalid, return a 400 Bad Request response
        res.status(400).send('Invalid token.');
    }
};