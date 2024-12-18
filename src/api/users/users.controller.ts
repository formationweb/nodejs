import fs from 'fs'
import { NotFoundError } from '../../errors/not-found'

const data = JSON.parse(fs.readFileSync('src/data/users.json', 'utf-8'))

export function getUsers(req, res) {
    const sortBy = req.query.sort
    console.log(sortBy)
    res.json(data)
}

export function getUser(req, res, next) {
    const id = req.params.id
    const userFound = data.find(user => user.id == id)
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