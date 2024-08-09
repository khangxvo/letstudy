
/**
 * Starts a HTTP server using Express.js.
 *
 * This is the main entry point of our application. It sets up the Express.js
 * app, specifies the port to listen on (defaulting to 3000 if PORT environment
 * variable is not set), and starts listening for incoming requests.
 *
 * @author [Your Name]
 * @copyright [Year] [Your Company/You]
 */
const { logger } = require('./startup/logger');
const app = require('./app');

/**
 * Port number to listen on. Defaults to 3000 if PORT environment variable
 */
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    logger.info(`Running on http://localhost:${port}/`)
})

// TODO: fixed loginPage.js

