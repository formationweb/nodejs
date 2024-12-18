import fs from 'fs'
import { NotFoundError } from '../../errors/not-found'

const dataUsers = JSON.parse(fs.readFileSync('src/data/users.json', 'utf-8'))
const dataPosts = JSON.parse(fs.readFileSync('src/data/posts.json', 'utf-8'))

export function getUsers(req, res) {
    const sortBy = req.query.sort
    console.log(sortBy)
    res.json(dataUsers)
}

export function getUser(req, res, next) {
    const id = req.params.id
    const userFound = dataUsers.find(user => user.id == id)
    if (userFound) {
        res.json(userFound)
        return
    }
    next(new NotFoundError('User'))
}

export function createUser(req, res) {
    console.log('Création')
    res.json({
        id: 1,
        name: 'ana'
    })
}

export function getUserPosts(req, res, next) {
    const id = req.params.userId
    const userPosts = dataPosts.filter(post => post.userId == id)
    if (userPosts.length == 0) {
        next(new NotFoundError('Not User'))
        return
    }
    res.json(userPosts)
}