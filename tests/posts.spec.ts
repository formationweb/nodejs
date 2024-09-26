import { beforeEach, describe, expect, test } from "vitest";
import request from 'supertest'
import { app } from "../src/server";
import mongoose from "mongoose";
import { Post } from "../src/api/posts/posts.model";

const URL = '/api/posts'

describe('Tester le controller /api/posts', () => {
    let post

    beforeEach(async () => {
        await mongoose.connection.dropDatabase()
        post = new Post({
            title: 'title',
            content: 'content',
            userId: '66f513a415f3bdfd1b86658b'
        })
        await post.save()
    })

    test('[GET] Posts', async () => {
        const res = await request(app).get(URL)
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(1)
    })

    test('[GET] Search Posts', async () => {
        const res = await request(app).get(URL + '?search=content')
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(1)
    })

    test('[GET] Search Posts with 0 result', async () => {
        const res = await request(app).get(URL + '?search=dadadaz')
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(0)
    })

    test('[GET] Post', async () => {
        const res = await request(app).get(URL + '/' + post._id)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('title')
    })

    test('[GET] Post Not Found', async () => {
        const res = await request(app).get(URL + '/66f513a415f3bdfd1b86658a')
        expect(res.status).toBe(404)
    })

    test('[GET] Post with fake param', async () => {
        const res = await request(app).get(URL + '/dzdza')
        expect(res.status).toBe(400)
    })

    test('[POST] Create Post', async () => {
        const res = await request(app).post(URL).send({
            title: 'aaa',
            content: 'bbb'
        })
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('_id')
        const posts = await Post.find()
        expect(posts).toHaveLength(2)
    })
})