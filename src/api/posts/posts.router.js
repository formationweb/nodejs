import { Router } from "express";
import { getPosts } from "./posts.controller.js";

const router = Router()

router.get('/', getPosts)

export default router