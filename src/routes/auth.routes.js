import Router from "express";
import { signIn, logout, profile } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/index.js";

const router = Router();

router.post("/login", signIn);

router.get("/profile", verifyToken, profile);

router.post("/logout", logout);

export default router;
