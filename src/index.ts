import express from 'express'
import usersRouter from './api/users/users.router'
import postsRouter from './api/posts/posts.router'
import { NotFoundError } from './errors/not-found'

const app = express()

app.use('/api/users', usersRouter)
app.use('/api/posts', postsRouter)

app.use((req, res, next) => {
    next(new NotFoundError('Page'))
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        ...err,
        message: err.message,
        stack: err.stack // only dev
    })
})

app.listen(3000, () => {
    console.log('serveur démarre')
})