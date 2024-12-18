import { Router } from "express";
import { createUser, getUser, getUserPosts, getUsers } from "./users.controller";

const router = Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.get('/:userId/posts', getUserPosts)
router.post('/', createUser)

export default router