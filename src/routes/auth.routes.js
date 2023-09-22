import Router from "express";
import {
  signIn,
  logout,
  profile,
  getAllUsers,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/index.js";

const router = Router();

router.post("/login", signIn);

router.get("/profile", verifyToken, profile);

router.get("/users/:time", verifyToken, getAllUsers);

router.post("/signout", logout);

export default router;
