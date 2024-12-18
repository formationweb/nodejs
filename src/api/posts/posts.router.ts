import { Router } from "express";
import { getPost, getPosts } from "./posts.controller";

const router = Router()

router.get('/', getPosts)
router.get('/:postId', getPost)

export default router