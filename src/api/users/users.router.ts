import { Router } from "express";
import {
  createUser,
  deleteUser,
  followUser,
  getUser,
  getUserPosts,
  getUsers,
  updateUser,
} from "./users.controller";

const router = Router();

router.get("/", getUsers);
router.get("/:userId", getUser);
router.get("/:userId/posts", getUserPosts);
router.post("/", createUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);
router.post("/follow", followUser);

export default router;
