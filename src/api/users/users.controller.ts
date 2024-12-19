import fs from 'fs'
import { NotFoundError } from '../../errors/not-found'
import { followSchema, userSchemaDto } from './users.schema'
import { BadRequestError } from '../../errors/bad-request'
import { ZodError } from 'zod'
import { User } from './users.model'

const dataUsers = JSON.parse(fs.readFileSync('src/data/users.json', 'utf-8'))
const dataPosts = JSON.parse(fs.readFileSync('src/data/posts.json', 'utf-8'))

const follows: any[] = [];

export async function getUsers(req, res, next) {
    try {
        const users = await User.find()
        res.json(users)
    }
    catch (err) {
        next(err)
    }
}

export async function getUser(req, res, next) {
    try {
        const id = req.params.userId
        const user = await User.findById(id)
        if (!user) {
            throw new NotFoundError('Users')
        }
        res.json(user)
    }
    catch (err) {
        next(err)
    }
}

export async function createUser(req, res, next) {
    try {
        const data = userSchemaDto.parse(req.body)
        const user = new User({
            name: data.name,
            email: data.email
        })
        const userCreated = await user.save()
        res.status(201).json(userCreated)
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
        const { followerId, followeeId } = followData

        if (!dataUsers.find(user => user.id == followerId)) {
                throw new NotFoundError('User Id')
        }
        if (!dataUsers.find(user => user.id == followeeId)) {
            throw new NotFoundError('User Id')
        }

        follows.push(followData)

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