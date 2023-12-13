import { Router } from 'express'
import { getUsers, updateUser } from './users.controller.js'

const router = Router()

router.get('/', getUsers)
router.put('/:userId', updateUser)

export default router