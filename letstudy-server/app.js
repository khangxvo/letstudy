
const express = require('express')
const app = express()
const path = require('path')

const config = require('config')

require('./startup/db')()
require('./startup/routes')(app)

app.get('/', (req, res) => {
    let data = {
        tasksUrl: config.get("tasksURL"),
        usersUrl: config.get("usersURL")
    }
    res.render('home', { data })

})

module.exports = app;
