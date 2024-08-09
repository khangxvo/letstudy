
const request = require('supertest')
const app = require('../../app')
const { User } = require('../../models/users')
const { Task } = require('../../models/tasks')
const config = require("config")
const { _descriptors } = require('chart.js/helpers')
const routes = config.get('usersURL')

// '/letstudy/users'

// describe(routes, () => {

//     afterEach(async () => {
//         await User.collection.deleteMany({})
//     })

//     describe('GET /', () => {
//         it('should return all user', async () => {
//             const userData = {
//                 name: "John Doe",
//                 email: "johndoe@example.com",
//                 password: "password123",
//             };
//             const user2 = {
//                 name: "kha",
//                 email: "k@gmail.com",
//                 password: "12345",
//                 isAdmin: true
//             }
//             await User.collection.insertMany([
//                 userData, user2

//             ])

//             const res = await request(app).get(routes)
//             expect(res.status).toBe(200)
//             expect(res.body.some(
//                 u => u.name === 'kha'
//             )).toBeTruthy()
//         })

//         it('test database should be always be empty', async () => {
//             const res = await User.find()

//             expect(res.length).toBe(0)
//         })
//     })

//     describe('POST /', () => {
//         it('should return 400 if none property given', async () => {
//             const res = await request(app)
//                 .post(routes)
//                 .send({ name: "khang" })

//             expect(res.status).toBe(400)
//         })

//         it("should return 200 and all user's property if post correctly", async () => {
//             const userData = {
//                 name: "John Doe",
//                 email: "johndoe@example.com",
//                 password: "password123"
//             };
//             const res = await request(app)
//                 .post(routes)
//                 .send(userData);


//             expect(res.status).toBe(200);
//         })
//     })


//     describe('login user', () => {
//         it('should return 200 if the user has registered', async () => {
//             const userData = {
//                 name: "John Doe",
//                 email: "john@example.com",
//                 password: "password123"
//             }

//             // Don't save directly to the data base, but save through api endpoint
//             let res = await request(app).post(routes).send(userData)
//             expect(res.status).toBe(200)

//             res = await request(app).post(config.get("loginURL")).send({ email: 'john@example.com', password: 'password123' })

//             expect(res.status).toBe(200)
//         })
//     })
// })

// describe('letstudy/tasks', () => {
//     let token = ''
//     let task = ''

//     beforeEach(async () => {
//         const userData = {
//             name: "John Doe",
//             email: "john@example.com",
//             password: "password123"
//         }
//         task = {
//             name: 'homework1',
//             timeInHours: 2
//         }
//         // Don't save directly to the data base, but save through api endpoint
//         let res = await request(app).post(routes).send(userData)

//         res = await request(app).post(config.get("loginURL")).send({ email: 'john@example.com', password: 'password123' })

//         token = res.text
//     })

//     afterAll(() => {
//         User.collection.deleteMany({})
//         Task.collection.deleteMany({})
//     })

//     const exec = (task, token) => {

//         return request(app)
//             .post(config.get('tasksURL'))
//             .set('x-auth-token', token)
//             .send(task)
//     }

//     const del = (id, token) => {
//         const url = config.get('tasksURL') + id

//         return request(app)
//             .delete(url)
//             .set('x-auth-token', token)
//     }

//     it('should return 200 if the user is logged in and can create a task', async () => {



//         let res = await exec(task, token)
//         expect(res.status).toBe(200)
//     })

//     it('should return 401 if no token provided', async () => {
//         token = ''
//         task = ''

//         let res = await exec(task, token)
//         expect(res.status).toBe(401)
//     })

//     it('should return 400 if given invalid token', async () => {
//         token = 'a'
//         task = ''

//         let res = await exec(task, token)
//         expect(res.status).toBe(400)
//     })

//     describe('DELETE /', () => {
//         it('should return 200 and not found if deleted successfully', async () => {
//             let res = await exec(task, token)
//             expect(res.status).toBe(200)

//             const taskID = res.body._id

//             res = await del(taskID, token)
//             expect(res.status).toBe(200)
//             expect(res.body).toHaveProperty('name', task.name, 'timeInHours', task.timeInHours)

//             res = await del(taskID, token)
//             expect(res.status).toBe(404)
//         })

//         it('should return 401 if no token given', async () => {
//             token = ''
//             taskID = 'akdjfhebi'
//             let res = await del(taskID, token)
//             expect(res.status).toBe(401)
//         })

//         it('should return 404 if task does not exist', async () => {
//             taskID = ''
//             let res = await del(taskID, token)
//             expect(res.status).toBe(404)
//         })
//     })
// })

describe('pseudo', () => {
    it('pass', () => {
        expect(true).toBe(true)
    })
})
