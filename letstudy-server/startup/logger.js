/**
 * This module log thing in a certain format
 */


const winston = require('winston');

// Define the logger configuration
const logger = winston.createLogger({
    level: 'info', // Log only if info level or higher
    format: winston.format.combine(
        winston.format.timestamp(), // Add timestamp
        winston.format.simple()     // Simple formatting
    ),
    transports: [
        new winston.transports.Console() // Console transport
    ]
});

module.exports.logger = logger;