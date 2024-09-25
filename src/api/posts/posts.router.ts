import { Router } from "express";
import { createPost, getPost, getPosts } from "./posts.controller";

const router = Router();

router.get("/", getPosts);
router.get("/:postId", getPost);
router.post('/', createPost)

export default router;
