
const { Task, validate, createTask } = require('../models/tasks')
const express = require('express')
const router = express.Router()
const auth = require('../middleware/login')
const _ = require('lodash')
const { User } = require('../models/users')

router.get('/', async (req, res) => {
    const result = await Task.find()
    res.send(result)
})

// Create task only when login 
router.post('/', auth, async (req, res) => {
    // validate task
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // validate user
    if (!req.header('user-id')) return res.status(404).send('user_id needed')
    let user = await User.findOne({ _id: req.header('user-id') })
    if (!user) return res.status(400).send('User does not exist')

    let task = new Task(
        _.pick(req.body, ['name', 'timeInHours'])
    )

    task = await task.save()

    // ref task to user
    user.tasks.push(task._id.toHexString())
    await user.save()

    res.send(task)

})

// Delete task 
router.delete('/:id', auth, async (req, res) => {
    // validate user
    if (!req.header('user-id')) return res.status(404).send('user_id needed')
    let user = await User.findOne({ _id: req.header('user-id') })
    if (!user) return res.status(400).send('User does not exist')

    // find and delete task from collection 
    const task = await Task.findByIdAndDelete(req.params.id)

    if (!task) return res.status(404).send('The genre with the given ID does not exist')

    // delete task from user's tasks array 
    user.tasks.pull(task._id.toHexString())
    await user.save()

    res.send(task)
})

module.exports = router