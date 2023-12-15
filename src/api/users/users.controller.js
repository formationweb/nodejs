import { BadRequestError } from '../../errors/bad-request.js'
import { NotFoundError } from '../../errors/not-found.js'
import { Post } from '../posts/posts.model.js'
import { User } from './users.model.js'

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
        const { name, email } = req.body
        if (!email) {
            throw new BadRequestError('Email manquant')
        }
        if (!name) {
            throw new BadRequestError('Nom manquant')
        }
        const user = new User({
            email,
            name
        })
        const userCreated = await user.save()
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