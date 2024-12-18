import { Router } from "express";
import { getPost, getPosts } from "./posts.controller";
import { isIdNumberMiddleware } from "../../middlewares/is-number";

const router = Router()

router.get('/', getPosts)
router.get('/:postId', isIdNumberMiddleware('postId'), getPost)

export default router