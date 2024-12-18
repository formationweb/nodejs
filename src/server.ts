import express, { NextFunction, Request, Response } from 'express'
import usersRouter from './api/users/users.router'
import postsRouter from './api/posts/posts.router'
import { NotFoundError } from './errors/not-found'
import { ErrorWithStatus } from './errors/errors.interface'

export const app = express()

app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/posts', postsRouter)

app.use((req, res, next) => {
    next(new NotFoundError('Route'))
})

app.use((err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack // only dev
    })
})
