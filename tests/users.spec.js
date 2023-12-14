import request from 'supertest'
import { app } from '../src/server'
import { describe, expect, test, vi } from "vitest";

const URL = '/api/users'

vi.mock('sequelize')

describe('Tester API /api/users', () => {
    test('[GET] Endpoint /api/users', async () => {
        const response = await request(app).get(URL)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveLength(1)
    })

    test('[PUT] Update User', async () => {
        const response = await request(app)
            .put(URL + '/1')
            .send({
                name: 'ben',
                email: 'ben@gmail.com'
            })
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('id')
    })

    test('[PUT] Update User with fake id', async () => {
        const response = await request(app)
            .put(URL + '/0')
            .send({
                name: 'ben',
                email: 'ben@gmail.com'
            })
        expect(response.statusCode).toBe(404)
    })

    test('[GET] Get Post By  user Id', async () => {
        const response = await request(app)
            .get(URL + '/1/posts')
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveLength(1)
    })

    test('[GET] Get Post By  user Id - fake id', async () => {
        const response = await request(app)
            .get(URL + '/0/posts')
        expect(response.statusCode).toBe(404)
    })
})