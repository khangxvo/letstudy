const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { User } = require('../models/users')
const mongoose = require('mongoose')
const Joi = require('joi')

/**
 * Use for user login
 */

/**
 * email = example@example.com
 * password = password123
 * jwtPrivateKey = key */

/**
 * @route POST /
 * @desc Authenticate user and return JWT
 * @access Public
 */
router.post('/', async (req, res) => {
    // Validate the request body
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Find the user by their email
    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Invalid email or password')

    // Compare the password provided with the hashed password in the database

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send('Invalid password')

    // Generate a JSON Web Token (JWT) for the user
    const token = user.generateAuthToken()
    const user_id = user._id
    res.send({ token, user_id })
})

/**
 * Validate the request body for user authentication
 * @param {Object} req - The request object containing user credentials
 * @returns {Object} - The result of the validation
 */
function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })

    return schema.validate(req)
}

module.exports = router