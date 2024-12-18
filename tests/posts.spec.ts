import request from 'supertest'
import { describe, expect, test } from "vitest";
import { app } from "../src/server";

const URL = '/api/posts'

describe('Tester /api/posts', () => {
    test('[GET] Posts', async () => {
        const res = await request(app).get(URL)
        expect(res.status).toBe(200)
        expect(res.body.length).toBeGreaterThan(0)
    })

    test('[GET] Search Posts', async () => {
        const res = await request(app).get(URL + '?search=sunt')
        expect(res.status).toBe(200)
        expect(res.body.length).toBeGreaterThan(0)
    })

    test('[GET] Post', async () => {
        const res = await request(app).get(URL + '/1')
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('id', 1)
        expect(res.body).toHaveProperty('title')
    })

    test('[GET] Post not found', async () => {
        const res = await request(app).get(URL + '/100000')
        expect(res.status).toBe(404)
    })

    test('[GET] Post not found', async () => {
        const res = await request(app).get(URL + '/dzdazzdazdaz')
        expect(res.status).toBe(400)
    })
})