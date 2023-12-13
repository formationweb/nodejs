import postsData from '../../data/posts.js'
import { NotFoundError } from '../../errors/not-found.js'

export function getUsers(req, res) {
    const searchValue = req.query.search
    res.json([
        {
            id: 1,
            name: searchValue,
            email: 'dzd@gmail.com'
        }
    ])
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

export function updateUser(req, res, next) {
    const id = +req.params.userId
    const body = req.body
    if (!isNaN(id)) {
        res.json({
            id: id,
            ...body
        })
        return
    }
    next(new NotFoundError('Utilisateur non trouvée'))
}