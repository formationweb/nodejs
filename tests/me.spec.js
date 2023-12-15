import { describe, test, expect, vi, beforeEach } from "vitest";
import request from 'supertest'
import { app } from '../src/server'
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import { User } from "../src/api/users/users.model";

const URL = '/me'

let user
let token

beforeEach(async () => {
    await mongoose.connection.dropDatabase()
    user = new User({
        email: 'test@test.net',
        name: 'test',
        password: 'azertyui'
    })
    const userSaved = await user.save()
    process.env.JWT_SECRET_TOKEN = 'test'
    token = jwt.sign({ userId: userSaved._id }, process.env.JWT_SECRET_TOKEN)
})

describe('Tester API /me', () => {
    test('[GET] Posts', async () => {
        const response = await request(app)
            .get(URL)
            .set('x-access-token', token)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('_id')
        expect(response.body).not.toHaveProperty('password')
    })

    test('[PUT] Posts', async () => {
        const response = await request(app)
            .put(URL)
            .set('x-access-token', token)
            .send({
                name: 'newname'
            })
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('_id')
        expect(response.body).not.toHaveProperty('password')
        expect(response.body.name).toBe('newname')
    })
})