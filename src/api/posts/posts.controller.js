import postsData from '../../data/posts.js'
import { NotFoundError } from '../../errors/not-found.js'

export function getPosts(req, res) {
    const searchStr = req.query.search
    if (!searchStr) {
        res.json(postsData)
        return
    }
    const postsFound = postsData.filter(post => post.title.includes(searchStr))
    res.json(postsFound)
}

export function getPost(req, res, next) {
    const id = req.params.postId
    const postFound = postsData.find(post => post.id == id)
    if (!postFound) {
        next(new NotFoundError('Article not found'))
        return
    }
    res.json(postFound)
}