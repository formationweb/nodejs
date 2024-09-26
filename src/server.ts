import 'dotenv/config'
import express from 'express'
import path from 'path'
import usersRouter from './api/users/users.router'
import postsRouter from './api/posts/posts.router'
import meRouter from './api/me/me.router'
import { NotFoundError } from './errors/not-found'
import { authMiddleware } from './middlewares/auth'
import cors from 'cors'
import helmet from 'helmet'

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.json())
app.use(cors())
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            'script-src': ["'self'", "cdnjs.cloudflare.com"]
        }
    }
}))
/*
{
    origin: 'http://monfrontend.com',
    methods: ['GET']
}
    */

app.use('/api/me', authMiddleware, meRouter)
app.use('/api/users', usersRouter)
app.use('/api/posts', postsRouter)

app.use(express.static(path.join(__dirname, 'public')))

app.get('/tpl', (req, res) => {
    res.render('index', {
        title: 'Ma Page',
        message: 'Titre'
    })
})

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