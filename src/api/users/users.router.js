import { Router } from 'express'
import { createUser, deleteUser, getPostsByUser, getUsers, updateUser } from './users.controller.js'

const router = Router()

router.get('/', getUsers)
router.get('/:userId/posts', getPostsByUser)
router.put('/:userId', updateUser)
router.post('/', createUser)
router.delete('/:userId', deleteUser)

export default router