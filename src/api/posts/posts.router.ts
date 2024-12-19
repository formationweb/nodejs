import { Router } from "express";
import { createPost, getPost, getPosts } from "./posts.controller";
import { isIdNumberMiddleware } from "../../middlewares/is-number";

const router = Router()

router.get('/', getPosts)
router.get('/:postId', isIdNumberMiddleware('postId'), getPost)
router.post('/', createPost)

export default router