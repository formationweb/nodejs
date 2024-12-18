import { Router } from "express";
import { createUser, deleteUser, getUser, getUserPosts, getUsers, updateUser } from "./users.controller";
import { isIdNumberMiddleware } from "../../middlewares/is-number";

const router = Router()
const fnMiddleware = isIdNumberMiddleware('userId')

router.get('/', getUsers)
router.get('/:userId', fnMiddleware, getUser)
router.get('/:userId/posts', fnMiddleware, getUserPosts)
router.post('/', createUser)
router.put('/:userId', fnMiddleware, updateUser)
router.delete('/:userId', fnMiddleware, deleteUser)

export default router