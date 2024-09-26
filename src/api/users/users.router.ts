import { Router } from "express";
import {
  createUser,
  deleteUser,
  followUser,
  getUser,
  getUserPosts,
  getUsers,
  login,
  updateUser,
} from "./users.controller";
import { authMiddleware } from "../../middlewares/auth";
import { isAdminMiddleware } from "../../middlewares/is-admin";

const router = Router();

router.get("/", getUsers);
router.get("/:userId", getUser);
router.get("/:userId/posts", getUserPosts);
router.post("/", createUser);
router.put("/:userId", updateUser);
router.delete("/:userId", authMiddleware, isAdminMiddleware, deleteUser);
router.post("/follow", authMiddleware, followUser);
router.post("/login", login);

export default router;
