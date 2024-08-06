
const request = require('supertest');
const app = require('../../app')
const { Task } = require('../../models/tasks')
const config = require('config')

describe('/letstudy/tasks', () => {

    afterEach(async () => {
        await Task.collection.deleteMany({})
    })

    describe('GET /', () => {
        it('should return all tasks', async () => {
            await Task.collection.insertMany([
                {
                    name: 'homework1',
                    timeInHours: 2
                },
                {
                    name: 'homework5',
                    timeInHours: 5
                },
            ])


            const res = await request(app).get(config.get('tasksURL'))
            expect(res.status).toBe(200)
        })
    })




})
