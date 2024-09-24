import { NotFoundError } from './../../errors/not-found';
import fs from 'fs'

const data = JSON.parse(fs.readFileSync("src/data/posts.json", "utf-8"));

export function getUsers(req, res ,next)  {
    res.json([
        {
            id: 1,
            name: 'ana',
            email: 'ana@gmail.com'
        }
    ])
}

export function getUser(req, res ,next) {
    const testValue = req.query.test
    console.log(testValue)
    const id = req.params.userId
    res.json({
        id, // équivalent à id: id
        name: 'ana',
        email: 'ana@gmail.com'
    })
}

export function getUserPosts(req, res, next) {
    const id = req.params.userId
    const userPosts = data.filter(post => post.userId == id)
    if (userPosts.length == 0) {
        next(new NotFoundError('not user'))
        return
    }
    res.json(userPosts)
}