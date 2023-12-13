import express from 'express'
import usersRouter from './api/users/users.router.js'
import { NotFoundError } from './errors/not-found.js'

const app = express()

app.use(express.json())

// app.use((req, res, next) => {
//     const error = new Error('Auth Failed')
//     error.status = 401
//     next(error)
// })

app.use('/api/users', usersRouter)

app.use((req, res, next) => {
    next(new NotFoundError('API non trouvée'))
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message
    })
})

app.listen(3000, () => {
    console.log('Le serveur tourne sur le port 3000')
})