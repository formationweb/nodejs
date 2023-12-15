import { NotFoundError } from '../../errors/not-found.js'
import { Post } from './posts.model.js'

export async function getPosts(req, res, next) {
    try {
        const searchValue = req.query.search
        const posts = await Post.find(searchValue ? {
            title: {
                $regex: new RegExp(searchValue, 'i')
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
        const post = await Post.findById(id)
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
        const post = new Post({ title, body, userId: 'fake' })
        const postModified = await post.save()
        res.json(postModified)
    }
    catch (err) {
        next(err)
    }
}