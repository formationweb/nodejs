import { NotFoundError } from '../../errors/not-found'
import { followSchema } from './users.schema'
import { BadRequestError } from '../../errors/bad-request'
import { ZodError, z } from 'zod'
import { User } from './users.model'
import { Post } from '../posts/posts.model'
import { NotAuthorizedError } from '../../errors/not-authorized'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const follows: any[] = [];

export async function getUsers(req, res, next) {
    try {
        const users = await User.find().select('-password')
        res.json(users)
    }
    catch (err) {
        next(err)
    }
}

export async function getUser(req, res, next) {
    try {
        const id = req.params.userId
        const user = await User.findById(id).select('-password')
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
            email: data.email,
            password: data.password
        })
        const userCreated = await user.save()
        userCreated.password = undefined as any
        res.status(201).json(userCreated)
    }
    catch (err: any) {
        next(new BadRequestError(err.errors))
    }
}

export async function getUserPosts(req, res, next) {
   try {
        const id = req.params.userId
        const user = await User.findById(id)

        if (!user) {
            throw new NotFoundError('Users')
        }

        const userPosts = await Post
            .find()
            .select('-__v')
            .limit(10)
            .populate({
                path: 'userId',
                match: {
                    _id: id
                },
                select: '-email -__v'
            })
        res.json(userPosts)
   }
   catch (err) {
    next(err)
   }
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

export async function login(req, res, next) {
    try {
        const loginSchema = z.object({
            email: z.string(),
            password: z.string()
        }).strict()
        const data = loginSchema.parse(req.body)
        const { email, password } = data
        const user = await User.findOne({ email })
        if (!user) {
            throw new NotAuthorizedError()
        }
        const isRightPassword = await bcrypt.compare(password, user.password)
        if (!isRightPassword) {
            throw new NotAuthorizedError() 
        }
        const token = jwt.sign({  userId: user._id }, process.env.JWT_SECRET_TOKEN, {
            expiresIn: '15m'
        })

        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV == 'production',
        //     maxAge: 3 * 24 * 60 * 60 * 1000
        // })

        res.json({ 
            token,
            userId: user._id
        })
    }
    catch (err) {
        next(err)
    }
}