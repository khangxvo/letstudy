
const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('config')
const { Task } = require("./tasks")
const Schema = mongoose.Schema

/* This code snippet is defining a Mongoose schema for a user in a Node.js application. Here's a
breakdown of what each property in the schema represents: */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minLength: 5,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }]
})

/**
 * Generates a JSON Web Token (JWT) for the user.
 * 
 * This method is used to authenticate users and ensure their identity.
 * It takes into account the user's `_id` and `isAdmin` status, which are essential
 * components of the JWT payload.
 * 
 * @param {Function} [this] The current instance of the User model.
 * @return {String} A JSON Web Token (JWT) for the user.
 */
userSchema.methods.generateAuthToken = function () {
    // console.log(config.get('jwtPrivateKey'))
    const token = jwt.sign({
        _id: this._id,
        isAdmin: this.isAdmin
    }, config.get('jwtPrivateKey'))
    return token
}

const User = mongoose.model('User', userSchema)


/**
 * Validates a user object against a Joi schema.
 * 
 * This method takes in a user object and checks it against the following rules:
 * - The `name` property must be a string with a minimum length of 1 and maximum length of 50.
 * - The `email` property must be a string with a minimum length of 5, maximum length of 255, and a valid email address.
 * - The `password` property must be a string with a minimum length of 5 and maximum length of 255.
 * 
 * @param {Object} user The user object to validate.
 * @return {Joi.ValidationResult} A ValidationResult object containing the validation result.
 */
function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(1).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })

    return schema.validate(user)
}

exports.User = User,
    exports.validate = validateUser;