import Router from "express";
import { signIn, logout } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", signIn);

router.post("/logout", logout);

export default router;
