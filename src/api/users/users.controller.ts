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
        //const data = userSchemaDto.parse(req.body)
        const data = req.body
        const user = new User({
            name: data.name,
            email: data.email
        })
        const userCreated = await user.save()
        res.status(201).json(userCreated)
    }
    catch (err: any) {
        next(new BadRequestError(err.errors))
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

export async function updateUser(req, res, next) {
    try {
        //const data = userSchemaDto.parse(req.body)
        const data = req.body
        const id = req.params.userId
        const user = await User.findByIdAndUpdate(id, {
            name: data.name,
            email: data.email
        }, {
            new: true,
            runValidators: true
        })
        if (!user) {
            throw new NotFoundError('Users')
        }
        res.json(user)
    }
    catch (err) {
        next(err)
    }
}

export async function deleteUser(req, res, next) {
    try {
        const id = req.params.userId
        const userIsDeleted = await User.findByIdAndDelete(id)
        if (!userIsDeleted) {
            throw new NotFoundError('Users')
        }
        res.status(204).send()
    }
    catch (err) {
        next(err)
    }
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