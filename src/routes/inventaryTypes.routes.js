import Router from "express";
import { getInventaryTypes } from "../controllers/inventaryTypes.controller.js";
import { verifyToken } from "../middleware/index.js";

const router = Router();

router.get("/inventaryTypes", verifyToken, getInventaryTypes);

export default router;
