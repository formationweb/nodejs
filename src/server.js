import express from 'express'
import usersRouter from './api/users/users.router.js'
import postsRouter from './api/posts/posts.router.js'
import { NotFoundError } from './errors/not-found.js'


export const app = express()

app.use(express.json())

// app.use((req, res, next) => {
//     const error = new Error('Auth Failed')
//     error.status = 401
//     next(error)
// })

app.use('/api/users', usersRouter)
app.use('/api/posts', postsRouter)

app.use((req, res, next) => {
    next(new NotFoundError('API non trouvée'))
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).json({
        message: err.message
    })
})