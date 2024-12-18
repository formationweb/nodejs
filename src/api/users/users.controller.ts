import fs from 'fs'
import { NotFoundError } from '../../errors/not-found'
import { followSchema, userSchemaDto } from './users.schema'
import { BadRequestError } from '../../errors/bad-request'
import { ZodError } from 'zod'

const dataUsers = JSON.parse(fs.readFileSync('src/data/users.json', 'utf-8'))
const dataPosts = JSON.parse(fs.readFileSync('src/data/posts.json', 'utf-8'))

const follows = [];

export function getUsers(req, res) {
    const sortBy = req.query.sort
    console.log(sortBy)
    res.json(dataUsers)
}

export function getUser(req, res, next) {
    const id = req.params.userId
    const userFound = dataUsers.find(user => user.id == id)
    if (userFound) {
        res.json(userFound)
        return
    }
    next(new NotFoundError('User'))
}

export function createUser(req, res, next) {
    // const { success, data, error } = userSchema.safeParse(req.body)
    // if (success) {
    //     res.json({
    //         id: 1,
    //         name: data.name,
    //         email: data.email
    //     })
    //     return
    // }
    // console.log(error.errors)
    // next(new BadRequestError())
    try {
        const data = userSchemaDto.parse(req.body)
        res.status(201).json({
            id: 1,
            name: data.name,
            email: data.email
        })
    }
    catch (err: any) {
        console.log(err.errors)
        next(new BadRequestError())
    }
}

export function getUserPosts(req, res, next) {
    const id = req.params.userId
    const userPosts = dataPosts.filter(post => post.userId == id)
    if (userPosts.length == 0) {
        next(new NotFoundError('Not User'))
        return
    }
    res.json(userPosts)
}

export function updateUser(req, res, next) {
    const id = req.params.userId
    res.json({ name: 'test '})
}

export function deleteUser(req, res, next) {
    const id = req.params.userId
    res.status(204).send()
}

export function followUser(req, res, next) {
    try {
        const followData = followSchema.parse(req.body)
        res.status(204).send()
    }
    catch (err) {
        if (err instanceof ZodError) {
            next(new BadRequestError(err.message))
            return
        }
        next(err)
    }
}