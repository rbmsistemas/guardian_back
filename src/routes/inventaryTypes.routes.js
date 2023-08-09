import Router from "express";
import { verifyToken } from "../middleware/index.js";
import { getInventaryTypes } from "../controllers/inventaryTypes.controller.js";

const router = Router();

router.get("/inventaryTypes", verifyToken, getInventaryTypes);

export default router;
