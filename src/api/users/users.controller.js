import { BadRequestError } from '../../errors/bad-request.js'
import { NotAuthorizedError } from '../../errors/not-authorized.js'
import { NotFoundError } from '../../errors/not-found.js'
import { Post } from '../posts/posts.model.js'
import { User } from './users.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export async function getUsers(req, res) {
    try {
        const searchValue = req.query.search
        /**
         * {
            $or: [
                {
                    name: searchValue
                },
                {
                    age: {
                        $gt: 18
                    }
                }
            ]
        }
         */
        const users = await User.find(searchValue ? {
            name: {
                $eq: searchValue
            }
        } : undefined)
        res.json(users)
    }
    catch (err) {
        next(err)
    }
}

export async function getPostsByUser(req, res, next) {
    try {
        const id = req.params.userId
        const posts = await Post.find().populate({
            path: 'userId',
            select: 'name',
            match: {
                _id: id
            }
        })
        //const posts = await Post.find({ userId: id })
        res.json(posts)
    }
    catch (err) {
        next(err)
    }
}

export async function updateUser(req, res, next) {
    try {
        const id = req.params.userId
        const { name, email } = req.body
        const user = await User.findByIdAndUpdate(id, {
            name,
            email
        }, {
            new: true
        })
        if (!user) {
            throw new NotFoundError('Utilisateur non trouvée')
        }
        res.json(user)
    }
    catch (err) {
        next(err)
    }
}

export async function createUser(req, res, next) {
    try {
        const { name, email, password } = req.body
        if (!email) {
            throw new BadRequestError('Email manquant')
        }
        if (!name) {
            throw new BadRequestError('Nom manquant')
        }
        const user = new User({
            email,
            name,
            password
        })
        const userCreated = await user.save()
        userCreated.password = undefined
        res.json(userCreated)
    }
    catch (err) {
        next(err)
    }
}

export async function deleteUser(req, res, next) {
    try {
        const id = req.params.userId
        const userIdDeleted = await User.findByIdAndDelete(id)
        if (!userIdDeleted) {
            throw new NotFoundError('Utilisateur non trouvée')
        }
        res.status(204).send()
    }
    catch (err) {
        next(err)
    }
}

export async function login(req, res, next) {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            throw new NotAuthorizedError()
        }
        const bool = await bcrypt.compare(password, user.password)
        if (!bool) {
            throw new NotAuthorizedError()
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_TOKEN, {
            expiresIn: '3d'
        })
        res.json({
            token,
            userId: user._id
        })
    }
    catch (err) {
        next(err)
    }
}