import { Router } from "express";
import { createPost, getPost, getPosts } from "./posts.controller.js";
import { isMongoIdMiddleware } from '../../middlewares/is-mongo-id.js'
import { authMiddleware } from "../../middlewares/auth.js";

const router = Router()

router.get('/', getPosts)
router.get('/:postId', isMongoIdMiddleware, getPost)
router.post('/', authMiddleware, createPost)

export default router