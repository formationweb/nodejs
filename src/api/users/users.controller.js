import postsData from '../../data/posts.js'
import { BadRequestError } from '../../errors/bad-request.js'
import { NotFoundError } from '../../errors/not-found.js'
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

export function getPostsByUser(req, res, next) {
    const id = req.params.userId
    const postsFound = postsData.filter(post => post.userId == id)
    if (postsFound.length == 0) {
        next(new NotFoundError('Utilisateur pas existant'))
        return
    }
    res.json(postsFound)
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