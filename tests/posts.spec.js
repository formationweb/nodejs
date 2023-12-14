import { describe, test, expect } from "vitest";
import request from 'supertest'
import { app } from '../src/server'

const URL = '/api/posts'

describe('Tester API /api/posts', () => {
    test('[GET] Posts', async () => {
        const response = await request(app).get(URL)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveLength(100)
    })

    test('[GET] Search Posts', async () => {
        const response = await request(app).get(URL + '?search=sunt')
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveLength(7)
    })

    test('[GET] Post Id', async () => {
        const response = await request(app).get(URL + '/1')
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('title')
    })

    test('[GET] Post Id - fake id', async () => {
        const response = await request(app).get(URL + '/fefeeffe')
        expect(response.statusCode).toBe(404)
    })
})