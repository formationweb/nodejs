import express from 'express'
import usersRouter from './api/users/users.router'

const app = express()

app.use('/api/users', usersRouter)

app.use((req, res, next) => {
    const error = new Error('page non trouvée')
    error['status'] = 404
    next(error)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message)
})

app.listen(3000, () => {
    console.log('serveur démarre')
})