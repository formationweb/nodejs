import { describe, expect, test, vi } from 'vitest'
import request from 'supertest'
import { getUsers } from '../src/api/users/users.controller'
import { app } from '../src/server'

const URL = '/api/users'

vi.mock('sequelize')

describe('Tester le controller /api/users', () => {
    test('[GET] User', async () => {
        const res = await request(app).get(URL)
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(1)
        expect(res.body[0]).toHaveProperty('name', 'ana')
    })

    test('[GET] User Id', async () => {
        const res = await request(app).get(URL + '/1')
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('name', 'ana')
    })

    test('[POST] Create User', async () => {
        const res = await request(app).post(URL).send({
            name: 'ben',
            email: 'ben@gmail.com'
        })
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('name', 'ben')
        expect(res.body).toHaveProperty('email', 'ben@gmail.com')
    })


    /*
    test('[GET] User Posts', async () => {
        const res = await request(app).get(URL + '/1/posts')
        expect(res.status).toBe(200)
        expect(res.body.length).toBeGreaterThan(0)
    })

    test('[GET] User Posts not Found', async () => {
        const res = await request(app).get(URL + '/1000/posts')
        expect(res.status).toBe(404)
    })

    test('[GET] Follow User', async () => {
        const res = await request(app)
            .post(URL + '/follow')
            .send({
                followerId: 1,
                followeeId: 2
            })
        expect(res.status).toBe(204)
    })

    test('[GET] Follow User Not Found', async () => {
        const res = await request(app)
            .post(URL + '/follow')
            .send({
                followerId: 1000,
                followeeId: 2
            })
        expect(res.status).toBe(404)
    })

    test('[GET] Follow User with fake data', async () => {
        const res = await request(app)
            .post(URL + '/follow')
            .send({
                followerId: 'fake',
                followeeId: 2
            })
        expect(res.status).toBe(400)
    })
        */
})