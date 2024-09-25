import { BadRequestError } from './../../errors/bad-request';
import { NotFoundError } from './../../errors/not-found';
import fs from 'fs'
import { z, ZodError } from 'zod'
import { Follow, followSchema, userSchema } from './users.schema';
import { UserModel } from './users.model';

const data = JSON.parse(fs.readFileSync("src/data/posts.json", "utf-8"));
const follows: Follow[] = []

export async function getUsers(req, res ,next)  {
    try {
        const users = await UserModel.find()
        res.json(users)
    }
    catch (err) {
        next(err)
    }
}

export function getUser(req, res ,next) {
    const testValue = req.query.test
    console.log(testValue)
    const id = req.params.userId
    res.json({
        id, // équivalent à id: id
        name: 'ana',
        email: 'ana@gmail.com'
    })
}

export function getUserPosts(req, res, next) {
    const id = req.params.userId
    const userPosts = data.filter(post => post.userId == id)
    if (userPosts.length == 0) {
        next(new NotFoundError('not user'))
        return
    }
    res.json(userPosts)
}

export function createUser(req, res, next) {
    const { success, error, data } = userSchema.safeParse(req.body)
    if (success) {
        const { name, email } = data
        res.status(201).json({ name, email })
    }
    else {
        console.log(error.errors)
        next(new BadRequestError())
    }
}

export function updateUser(req, res, next) {
    const id = req.params.userId
    res.json({ name: 'test' })
}

export function deleteUser(req, res, next) {
    const id = req.params.userId
    res.status(204).send()
}

export function followUser(req, res, next) {
   try {
    const followData = followSchema.parse(req.body)
    const { followerId, followeeId } = followData

    if (!users.find(user => user.id == followerId)) {
        throw new NotFoundError('User Id')
    }
    if (!users.find(user => user.id == followeeId)) {
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