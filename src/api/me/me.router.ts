import { Router } from "express";
import { getMe, updateMe } from "./me.controller";
import { authMiddleware } from "../../middlewares/auth";

const router = Router()

router.use(authMiddleware)

router.get('/', getMe)
router.put('/', updateMe)

export default router