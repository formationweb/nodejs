import { NotFoundError } from '../../errors/not-found.js'
import { Post } from './posts.model.js'

export async function getPosts(req, res) {
    try {
        const searchValue = req.query.search
        const posts = await Post.findAll(searchValue ? {
            where: {
                name: searchValue
            }
        } : undefined)
        res.json(posts)
    }
    catch (err) {
        next(err)
    }
}

export async function getPost(req, res, next) {
    const id = req.params.postId
    try {
        const post = await Post.findByPk(id)
        if (!post) {
            throw new NotFoundError('Article non trouvé')
        }
        res.json(post)
    }
    catch (err) {
        next(err)
    }
}

export async function createPost(req, res, next) {
    try {
        const { title, body } = req.body
        if (!title) {
            throw new BadRequestError('Titre manquant')
        }
        if (!body) {
            throw new BadRequestError('Corps manquant')
        }
        const post = await Post.create({ title, body, userId: 3 })
        res.json(post)
    }
    catch (err) {
        next(err)
    }
}