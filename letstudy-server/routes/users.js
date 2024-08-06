
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const { User, validate } = require('../models/users')

router.get('/', async (req, res) => {
    const users = await User.find().select('name email');
    res.send(users);
});

// Register User
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered');

    user = new User(
        _.pick(req.body, ['name', 'email', 'password'])
    );

    // bcrypt.genSalt(10) asynchronously generates a salt using bcrypt with a complexity factor of 10. The complexity factor determines the computational cost of hashing the password.
    const salt = await bcrypt.genSalt(10)
    // bcrypt.hash(user.password, salt) asynchronously hashes the user's password using the generated salt. Hashing the password securely transforms it into a fixed-length string that cannot be reversed back to the original password.
    user.password = await bcrypt.hash(user.password, salt);

    await user.save()

    const token = user.generateAuthToken()
    //.send(_.pick(user, ["_id", "name", "email"])) sends a response containing selected properties (_id, name, and email) of the user object using lodash's _.pick function.
    res.header('x-auth-token', token).send(_.pick(user, ["_id", "name", "email"]));

})

/**
 * email = example@example.com
 * password = password123
 * jwtPrivateKey = key */


module.exports = router;
