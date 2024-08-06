// Import route handlers for tasks, users, and login
const tasks = require('../routes/tasks');
const users = require('../routes/users');
const login = require('../routes/login');
const cors = require('cors')

const config = require('config')

// Import the Express framework
const express = require('express');
const { compact } = require('lodash');
// console.log(__dirname + '/../public')

/**
 * Configures the Express application with necessary middleware and routes.
 * 
 * @param {Object} app - The Express application instance.
 */
module.exports = function (app) {
    // Middleware to parse JSON bodies in requests
    app.use(express.json());

    // Enable CORS
    app.use(cors())

    // Static Files
    app.use(express.static('public'))
    app.use('/css', express.static(__dirname + '/../public/css'))
    app.use('/js', express.static(__dirname + '/../public/js'))

    // Set the view engine to EJS for rendering HTML templates
    app.set('view engine', 'ejs');

    // Define routes for tasks, users, and login under the '/letstudy' path
    app.use(config.get("tasksURL"), tasks);
    app.use(config.get("usersURL"), users);
    app.use(config.get("loginURL"), login);
};