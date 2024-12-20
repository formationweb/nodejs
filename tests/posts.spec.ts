import request from 'supertest'
import { beforeEach, describe, expect, test } from "vitest";
import { app } from "../src/server";
import mongoose, { mongo } from 'mongoose';
import { Post } from '../src/api/posts/posts.model';

const URL = '/api/posts'

describe('Tester /api/posts', () => {
    let post

    beforeEach(async () => {
        await mongoose.connection.dropDatabase();
        await Post.syncIndexes()
        post = new Post({
            title: 'titre',
            content: 'content',
            userId: '66f513a415f3bdfd1b86658b'
        });
        await post.save();
    });

    // test('', async () => {
    //     const indexes = await mongoose.connection.db?.collection('posts').indexes()
    //     expect(indexes).toEqual(
    //         expect.arrayContaining(
    //             expect.objectContaining({
    //                 key: { _fts: 'text',  _ftsx: 1 }
    //             })
    //         )
    //     )
    // })

    test('[GET] Posts', async () => {
        const res = await request(app).get(URL)
        expect(res.status).toBe(200)
        expect(res.body.length).toBeGreaterThan(0)
    })

    test('[GET] Search Posts', async () => {
        const res = await request(app).get(URL + '?search=titre')
        expect(res.status).toBe(200)
        expect(res.body.length).toBeGreaterThan(0)
    })
    
    test('[GET] Post Id', async () => {
        const res = await request(app).get(URL + '/' + post._id)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('_id')
        expect(res.body).toHaveProperty('title')
    })

    test('[GET] Post not found', async () => {
        const res = await request(app).get(URL + '/66f513a415f3bdfd1b86658f')
        expect(res.status).toBe(404)
    })

    test('[GET] Post not found', async () => {
        const res = await request(app).get(URL + '/dzdazzdazdaz')
        expect(res.status).toBe(400)
    })
})