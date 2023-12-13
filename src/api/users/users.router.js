import { Router } from 'express'
import { getPostsByUser, getUsers, updateUser } from './users.controller.js'

const router = Router()

router.get('/', getUsers)
router.get('/:userId/posts', getPostsByUser)
router.put('/:userId', updateUser)

export default router