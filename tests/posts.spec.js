import { describe, test, expect, vi, beforeEach } from "vitest";
import request from 'supertest'
import { app } from '../src/server'
import { Post } from "../src/api/posts/posts.model";
import mongoose from "mongoose";

const URL = '/api/posts'

let post

beforeEach(async () => {
    await mongoose.connection.dropDatabase()
    post = new Post({
        userId: 'fake',
        title: 'title',
        body: 'body'
    })
    await post.save()

})

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

    test('[GET] Search Posts with title found', async () => {
        const response = await request(app).get(URL + '?search=Tit')
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveLength(1)
    })

    test('[POST] Create Post', async () => {
        const response = await request(app)
            .post(URL)
            .send({
                title: 'dadaz',
                body: 'dzdz'
            })
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('_id')
    })

    test('[GET] Post Id', async () => {
        const response = await request(app).get(URL + '/' + post._id)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('_id')
    })

    test('[GET] Post Id - fake id', async () => {
        const response = await request(app).get(URL + '/657c240941c5417657118f19')
        expect(response.statusCode).toBe(404)
    })
})