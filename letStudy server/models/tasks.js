/**
 * This module defines a task schema for a MongoDB database, provides a function to validate task data,
 * and includes a function to create and save a task in the database.
 * @param task - The `task` object represents a task that needs to be saved into the database. It
 * should have the following properties:
 * @returns The module is exporting the taskSchema, Task model, validateTask function, and createTask
 * function.
 */


const Joi = require('joi')
const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100
    },
    timeInHours: {
        type: Number,
        required: true,
        min: 1,
        max: 24
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateFinished: {
        type: Date
    }
})

const Task = mongoose.model('Task', taskSchema)

/**
 * The function `validateTask` uses Joi schema to validate a task object with name and timeInHours
 * properties.
 * @param task - The `validateTask` function takes a `task` object as a parameter. The `task` object
 * should have the following properties:
 * @returns The `validateTask` function is returning the result of validating the `task` object against
 * the defined schema using Joi. The result will include any validation errors if the `task` object
 * does not meet the specified criteria in the schema.
 */
function validateTask(task) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        timeInHours: Joi.number().min(1).max(24).required(),
    })

    return schema.validate(task)
}

async function createTask() {
    const task = new Task({
        name: 'homework',
        timeInHours: 2
    })

    const result = await task.save()
    console.log(result)
}

exports.taskSchema = taskSchema;
exports.Task = Task;
exports.validate = validateTask;
exports.createTask = createTask;