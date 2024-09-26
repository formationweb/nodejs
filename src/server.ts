import 'dotenv/config'
import express from 'express'
import usersRouter from './api/users/users.router'
import postsRouter from './api/posts/posts.router'
import { NotFoundError } from './errors/not-found'

export const app = express()

app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/posts', postsRouter)

app.use((req, res, next) => {
    next(new NotFoundError('Page'))
})

app.use((err, req, res, next) => {
    const options: any = {}
    if (process.env.NODE_ENV != 'production')  {
        options.stack = err.stack
    }
    if (!err.status) {
        console.log(err)
    }
    res.status(err.status || 500).json({
        ...err,
        message: err.message,
        ...options
    })
})