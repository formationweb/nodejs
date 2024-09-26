import { beforeEach, describe, expect, test, vi } from 'vitest'
import request from 'supertest'
import { getUsers } from '../src/api/users/users.controller'
import { app } from '../src/server'
import mongoose from 'mongoose'
import { Role, UserModel } from '../src/api/users/users.model'
import jwt from 'jsonwebtoken'

const URL = '/api/users'

describe('Tester le controller /api/users', () => {
    let user
    let token

    beforeEach(async () => {
        await mongoose.connection.dropDatabase()
        user = new UserModel({
            name: 'ana',
            email: 'ana@gmail.com',
            password: 'azertyui'
        })
        const userSaved = await user.save()
        process.env.JWT_SECRET_TOKEN = 'test'
        token = jwt.sign({ userId: userSaved._id }, process.env.JWT_SECRET_TOKEN)
    })

    test('[GET] User', async () => {
        const res = await request(app).get(URL)
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(1)
    })

    test('[GET] User Id', async () => {
        const res = await request(app).get(URL + '/' + user._id)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('name', 'ana')
        expect(res.body.password).not.toBeDefined() // .toBeUndefined()
    })

    test('[Delete] User with not auth', async () => {
        const res = await request(app).delete(URL + '/' + user._id)
        expect(res.status).toBe(401)
    })

    test('[Delete] User but not admin', async () => {
        const res = await request(app)
            .delete(URL + '/' + user._id)
            .set({
                'x-access-token': token
            })
        expect(res.status).toBe(403)
    })

    test('[Delete] User, ok', async () => {
        user.role = Role.Admin
        await user.save()
        const res = await request(app)
            .delete(URL + '/' + user._id)
            .set({
                'x-access-token': token
            })
        expect(res.status).toBe(204)
    })

   /* test('[GET] User Posts', async () => {
        const res = await request(app).get(URL + '/1/posts')
        expect(res.status).toBe(200)
        expect(res.body.length).toBeGreaterThan(0)
    })

    test('[GET] User Posts not Found', async () => {
        const res = await request(app).get(URL + '/1000/posts')
        expect(res.status).toBe(404)
    })

    test('[GET] Follow User', async () => {
        const res = await request(app)
            .post(URL + '/follow')
            .send({
                followerId: 1,
                followeeId: 2
            })
        expect(res.status).toBe(204)
    })

    test('[GET] Follow User Not Found', async () => {
        const res = await request(app)
            .post(URL + '/follow')
            .send({
                followerId: 1000,
                followeeId: 2
            })
        expect(res.status).toBe(404)
    })

    test('[GET] Follow User with fake data', async () => {
        const res = await request(app)
            .post(URL + '/follow')
            .send({
                followerId: 'fake',
                followeeId: 2
            })
        expect(res.status).toBe(400)
    })
    */
})