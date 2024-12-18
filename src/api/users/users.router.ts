import { Router } from "express";
import { createUser, getUser, getUsers } from "./users.controller";

const router = Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/', createUser)

export default router