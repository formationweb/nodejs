import { Router } from 'express'
import { createUser, deleteUser, getPostsByUser, getUsers, login, updateUser } from './users.controller.js'
import { isMongoIdMiddleware } from '../../middlewares/is-mongo-id.js'
import { authMiddleware } from '../../middlewares/auth.js'
import { roleMiddleware } from '../../middlewares/role.js'

const router = Router()

router.get('/', getUsers)
router.get('/:userId/posts', isMongoIdMiddleware, getPostsByUser)
router.put('/:userId', authMiddleware, roleMiddleware('admin'), isMongoIdMiddleware, updateUser)
router.post('/', authMiddleware, roleMiddleware('admin'), createUser)
router.delete('/:userId', authMiddleware, roleMiddleware('admin'), isMongoIdMiddleware, deleteUser)

router.post('/login', login)

export default router