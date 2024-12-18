import { describe, expect, test, vi } from 'vitest'
import request from 'supertest'
import { getUsers } from '../src/api/users/users.controller'
import { app } from '../src/server'

const URL = '/api/users'

describe('Tester l\'api /api/users', () => {
    test('Tester getUsers', () => {
        const req = {
            query: vi.fn()
        }
        const res = {
            json: vi.fn()
        }
        getUsers(req, res)
        expect(res.json).toHaveBeenCalled()
    })

    test('[GET] User', async () => {
        const res = await request(app).get(URL)
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(10)
    })

    test('[POST] Create', async () => {
        const res = await request(app)
            .post(URL)
            .send({
                name: 'test',
                email: 'test@aa.net'
            })
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('id')
    })

    test('[POST] Create with fake email', async () => {
        const res = await request(app)
            .post(URL)
            .send({
                name: 'test',
                email: 'test'
            })
        expect(res.status).toBe(400)
    })

    test('[GET] Users Posts', async () => {
        const res = await request(app).get(URL + '/1/posts')
        expect(res.status).toBe(200)
        expect(res.body.length).toBeGreaterThan(0)
    })

    test('[GET] Users Posts not found', async () => {
        const res = await request(app).get(URL + '/1000/posts')
        expect(res.status).toBe(404)
    })
})