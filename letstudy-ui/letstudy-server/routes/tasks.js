
const { Task, validate, createTask } = require('../models/tasks')
const express = require('express')
const router = express.Router()
const auth = require('../middleware/login')
const _ = require('lodash')

router.get('/', async (req, res) => {
    const result = await Task.find()
    res.send(result)
})

// Create task only when login 
router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let task = new Task(
        _.pick(req.body, ['name', 'timeInHours'])
    )

    task = await task.save()
    res.send(task)

})

// Delete task 
router.delete('/:id', auth, async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id)

    if (!task) return res.status(404).send('The genre with the given ID does not exist')

    res.send(task)
})

module.exports = router