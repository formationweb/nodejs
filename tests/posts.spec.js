import { describe, test, expect, vi } from "vitest";
import request from 'supertest'
import { app } from '../src/server'

const URL = '/api/posts'

vi.mock('sequelize')

describe('Tester API /api/posts', () => {
    test('[GET] Posts', async () => {
        const response = await request(app).get(URL)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveLength(1)
    })

    test('[GET] Search Posts', async () => {
        const response = await request(app).get(URL + '?search=test')
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveLength(0)
    })

    test('[POST] Create Post', async () => {
        const response = await request(app)
            .post(URL)
            .send({
                title: 'dadaz',
                body: 'dzdz'
            })
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('id')
    })

    test('[GET] Post Id', async () => {
        const response = await request(app).get(URL + '/1')
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('id')
    })

    test('[GET] Post Id - fake id', async () => {
        const response = await request(app).get(URL + '/0')
        expect(response.statusCode).toBe(404)
    })
})