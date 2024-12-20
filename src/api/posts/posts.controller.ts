import { NotFoundError } from '../../errors/not-found'
import { BadRequestError } from '../../errors/bad-request'
import { Post } from './posts.model'

export async function getPosts(req, res, next) {
    try {
        const search = req.query.search
        const options = search ? {
            $text: {
                $search: search
            }
        } : {}
        const posts = await Post.find(options)
        res.json(posts)
    }
    catch (err) {
        next(err)
    }
}

export async function getPost(req, res, next) {
    try {
        const id = req.params.postId
        const post = await Post.findById(id)
        if (!post) {
            throw new NotFoundError('Posts')
        }
        res.json(post)
    }
    catch (err) {
        next(err)
    }
}

export async function createPost(req, res, next) {
    try {
        const { title, content } = req.body
        const post = new Post({
            title,
            content,
            userId: ''
        })
        res.status(201).json(
            await post.save()
        )
    }
    catch (err) {
        next(err)
    }
}