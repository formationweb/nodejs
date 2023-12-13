import request from 'supertest'
import { app } from '../src/server'
import { describe, expect, test } from "vitest";

const URL = '/api/users'

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
            .put(URL + '/fzfzefzezererg')
            .send({
                name: 'ben',
                email: 'ben@gmail.com'
            })
        expect(response.statusCode).toBe(404)
    })
})