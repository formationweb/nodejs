import { Router } from 'express'
import { createUser, deleteUser, getPostsByUser, getUsers, updateUser } from './users.controller.js'
import { isMongoIdMiddleware } from '../../middlewares/is-mongo-id.js'

const router = Router()

router.get('/', getUsers)
router.get('/:userId/posts', isMongoIdMiddleware, getPostsByUser)
router.put('/:userId', isMongoIdMiddleware, updateUser)
router.post('/', createUser)
router.delete('/:userId', isMongoIdMiddleware, deleteUser)

export default router