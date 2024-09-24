import { describe, expect, test, vi } from 'vitest'
import request from 'supertest'
import { getUsers } from '../src/api/users/users.controller'
import { app } from '../src/server'

describe('Tester le controller /api/users', () => {
    test('Tester getUsers()', () => {
        const req = vi.fn()
        const res = {
            json: vi.fn()
        }
        const next = vi.fn()
        getUsers(req, res, next)
        expect(res.json).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalledWith([ 
            {
                id: 1,
                name: 'ana',
                email: 'ana@gmail.com'
            }
        ])
    })

    test('[GET] User', async () => {
        const res = await request(app).get('/api/users')
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(1)
    })

    //  await request(app).post(URL).send({  })
    //  expect({ }).toHaveProperty('name', 'ana')
})