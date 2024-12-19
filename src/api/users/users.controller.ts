import { NotFoundError } from '../../errors/not-found'
import { followSchema, userSchemaDto } from './users.schema'
import { BadRequestError } from '../../errors/bad-request'
import { ZodError } from 'zod'
import { User } from './users.model'
import { Post } from '../posts/posts.model'
import { db } from '../../db'

const follows: any[] = [];

export async function getUsers(req, res) {
    const users = await User.findAll()
    res.json(users)
}

export async function getUser(req, res, next) {
    try {
        const id = req.params.userId
        const user = await User.findByPk(id)
        if (!user) {
            throw new NotFoundError('User')
        }
        res.json(user)
    }
    catch(err) {
        next(err)
    }
}

export async function createUser(req, res, next) {
    try {
        const data = userSchemaDto.parse(req.body)
        const userCreated = await User.create({
            name: data.name,
            email: data.email
        })
        res.status(201).json(userCreated)
    }
    catch (err: any) {
        console.log(err.errors)
        next(new BadRequestError())
    }
}

export async function getUserPosts(req, res, next) {
    try {
        const id = req.params.userId
        const user = await User.findByPk(id, {
            include: [
                {
                    model: Post,
                    as: 'articles'
                    
                }
            ]
        })
        if (!user) {
            throw new NotFoundError('Not User')
        }
        res.json(user)
    }
    catch (err) {
        next(err)
    }
}

export async function updateUser(req, res, next) {
   try {
        const id = req.params.userId
        const data = userSchemaDto.parse(req.body)
        const [userId] = await User.update(data, {
            where: {
                id
            }
        })
        if (!userId) {
            throw new NotFoundError('Not User')
        }
        res.json(
            await User.findByPk(userId)
        )
   }
   catch (err) {
    next(err)
   }
}

export async function deleteUser(req, res, next) {
    const t = await db.transaction()
    try {
        const id = req.params.userId

        const rowsDeleted = await User.destroy({
            where: {
                id
            },
            transaction: t
        })

        if (!rowsDeleted) {
            throw new NotFoundError('Not User')
        }

        await Post.destroy({
            where: {
                userId: id
            },
            transaction: t
        })

        await t.commit()
        
        res.status(204).send()
    }
    catch (err) {
        await t.rollback()
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