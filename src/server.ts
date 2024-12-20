import express, { NextFunction, Request, Response } from 'express'
import usersRouter from './api/users/users.router'
import postsRouter from './api/posts/posts.router'
import meRouter from './api/me/me.router'
import { NotFoundError } from './errors/not-found'
import { ErrorWithStatus } from './errors/errors.interface'
import path from 'path'
import helmet from 'helmet'
import cors from 'cors'

export const app = express()
const dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(express.json())
app.use(cors())
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            'script-src': ["'self'", "cdnjs.cloudflare.com"]
        }
    }
}))

app.use('/api/me', meRouter)
app.use('/api/users', usersRouter)
app.use('/api/posts', postsRouter)

app.use(express.static(path.join(dirname, 'public')))

app.use((req, res, next) => {
    next(new NotFoundError('Route'))
})

app.use((err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack // only dev
    })
})
