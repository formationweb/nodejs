import { Router } from "express";
import { getMe, updateMe } from "./me.controller";

const router = Router()

router.get('/', getMe)
router.put('/', updateMe)

export default router