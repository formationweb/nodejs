import { Router } from 'express'
import { createUser, deleteUser, getUser, getUserPosts, getUsers, updateUser } from './users.controller'

const router = Router()

router.get('/',getUsers)
router.get('/:userId', getUser)
router.get('/:userId/posts', getUserPosts)
router.post('/', createUser)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)

export default router