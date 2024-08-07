const request = require('supertest')
const app = require('../../app')
const config = require('config')

describe('Create users and add tasks', () => {


    // const username = "example@example.com"
    const email = "example@example.com"
    const password = "password123"
    const name = "John Doe"

    const register = (name, email, password) => {
        return request(app)
            .post(config.get("usersURL"))
            .send({ name, email, password })
    }

    const login = (email, password) => {
        return request(app)
            .post(config.get('loginURL'))
            .send({ email, password })
    }

    const token_n_id = async (email, password) => {
        let res = await login(email, password)
        return res.body
    }

    const del_user = (user_id, token) => {
        const delete_url = config.get('usersURL') + user_id
        return request(app)
            .delete(delete_url)
            .set('x-auth-token', token)
    }

    const create_task = async (token, name, timeInHours, user_id) => {
        return await request(app)
            .post(config.get('tasksURL'))
            .set({
                'x-auth-token': token,
                'user-id': user_id
            })
            .send({ name, timeInHours })
    }

    const del_task = async (token, user_id, task_id) => {
        const delete_url = config.get('tasksURL') + task_id
        return await request(app)
            .delete(delete_url)
            .set({
                'x-auth-token': token,
                'user-id': user_id
            })
    }

    it('register user', async () => {
        const res = await register(name, email, password)

        expect(res.status).toBe(200)
    })

    it('should return 200 if passed in correct username and password', async () => {
        let res = await login(email, password)
        expect(res.status).toBe(200)
    })

    it('should return 200 if create and delete task successfully', async () => {
        let { token, user_id } = await token_n_id(email, password)

        let res = await create_task(token, 'homework', 2, user_id)
        expect(res.status).toBe(200)

        let task_id = res.body._id
        res = await del_task(token, user_id, task_id)
        expect(res.status).toBe(200)
        expect(res.body._id).toBe(task_id)
    })



    it('should return 200 if delete user successully', async () => {
        let res = await login(email, password)
        expect(res.status).toBe(200)

        let { token, user_id } = res.body

        res = await del_user(user_id, token)
        expect(res.status).toBe(200)
        expect(res.body._id).toBe(user_id)
    })



})
