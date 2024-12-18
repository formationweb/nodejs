import fs from 'fs'
import { NotFoundError } from '../../errors/not-found'
import { BadRequestError } from '../../errors/bad-request'
import { Post } from './posts.model'

const data = JSON.parse(fs.readFileSync('src/data/posts.json', 'utf-8'))
    .map(
        post => new Post(post)
    )

export function getPosts(req, res, next) {
    const search = req.query.search
    if (search) {
        const posts = data.filter((post: Post) => post.title.includes(search))
        res.json(posts)
        return
    }
    res.json(data)
}

export function getPost(req, res, next) {
    const id = +req.params.postId
    if (id > 0) {
        const post = data.find(post => post.id == id)
        if (!post) {
            next(new NotFoundError('Posts'))
            return   
        }
        res.json(post)
    }
    next(new BadRequestError())
}