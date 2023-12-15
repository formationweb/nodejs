import request from 'supertest'
import { app } from '../src/server'
import { describe, expect, test, beforeEach } from "vitest";
import mongoose from 'mongoose';
import { User } from '../src/api/users/users.model';

const URL = '/api/users'

let user

beforeEach(async () => {
    await mongoose.connection.dropDatabase()
    user = new User({
        name: 'test',
        email: 'fzz@gmail.com'
    })
    await user.save()
})

describe('Tester API /api/users', () => {
    test('[GET] Endpoint /api/users', async () => {
        const response = await request(app).get(URL)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveLength(1)
    })

    test('[PUT] Update User', async () => {
        const response = await request(app)
            .put(URL + '/' + user._id)
            .send({
                name: 'ben',
                email: 'ben@gmail.com'
            })
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('_id')
    })

    test('[PUT] Update User with fake id', async () => {
        const response = await request(app)
            .put(URL + '/657c240941c5417657118f19')
            .send({
                name: 'ben',
                email: 'ben@gmail.com'
            })
        expect(response.statusCode).toBe(404)
    })

    test('[PUT] Update User with fake id, because it is not mongo id', async () => {
        const response = await request(app)
            .put(URL + '/fefzeer')
            .send({
                name: 'ben',
                email: 'ben@gmail.com'
            })
        expect(response.statusCode).toBe(400)
    })

    // test('[GET] Get Post By  user Id', async () => {
    //     const response = await request(app)
    //         .get(URL + '/1/posts')
    //     expect(response.statusCode).toBe(200)
    //     expect(response.body).toHaveLength(1)
    // })

    // test('[GET] Get Post By  user Id - fake id', async () => {
    //     const response = await request(app)
    //         .get(URL + '/0/posts')
    //     expect(response.statusCode).toBe(404)
    // })
})