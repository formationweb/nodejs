import { BadRequestError } from '../../errors/bad-request.js'
import { NotFoundError } from '../../errors/not-found.js'
import { Post } from '../posts/posts.model.js'
import { User } from './users.model.js'

export async function getUsers(req, res) {
    try {
        const searchValue = req.query.search
        const users = await User.findAll(searchValue ? {
            where: {
                name: searchValue
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
        const user = await User.findByPk(id, {
            include: [{
                model: Post,
                as: 'posts'
            }]
        })
        if (!user) {
            throw new NotFoundError('Utilisateur non trouvé')
        }
       /* const userExist = await User.findByPk(id)
        if (!userExist) {
            throw new NotFoundError('Utilisateur non trouvé')
        }
        const postsFound = await Post.findAll({
            where: {
                userId: id
            }
        })*/
        res.json(user.posts)
    }
    catch (err) {
        next(err)
    }
}

export async function updateUser(req, res, next) {
    try {
        const id = +req.params.userId
        const { name, email } = req.body
        if (!isNaN(id)) {
            const [userId] = await User.update({
                name, 
                email
            }, {
                where: {
                    id
                }
            })
            if (!userId) {
                throw new NotFoundError('Utilisateur non trouvée')
            }
            res.json(await User.findByPk(userId))
            return
        }
        throw new BadRequestError('Id incorrect')
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
        const user = await User.create({ name, email })
        res.json(user)
    }
    catch (err) {
        next(err)
    }
}

export async function deleteUser(req, res, next) {
    try {
        const id = +req.params.userId
        const userIdDeleted = await User.destroy({
            where: {
                id
            }
        })
        if (!userIdDeleted) {
            throw new NotFoundError('Utilisateur non trouvée')
        }
        res.status(204).send()
    }
    catch (err) {
        next(err)
    }
}