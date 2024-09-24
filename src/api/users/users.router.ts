import { Router } from 'express'
import { getUser, getUserPosts, getUsers } from './users.controller'

const router = Router()

router.get('/',getUsers)
router.get('/:userId', getUser)
router.get('/:userId/posts', getUserPosts)

export default router