
const express = require('express')
const app = express()
const path = require('path')

const config = require('config')

require('./startup/db')()
require('./startup/routes')(app)

app.get('/', (req, res) => {
    // let data = {
    //     tasksUrl: config.get("tasksURL"),
    //     usersUrl: config.get("usersURL")
    // }
    // res.render('home', { data })
    const port = process.env.PORT || 3000;
    res.send({
        tasksURL: config.get('tasksURL'),
        loginURL: config.get('loginURL'),
        usersURL: config.get('usersURL'),
        serverURL: `http://localhost:${port}`
    })

})

module.exports = app;
