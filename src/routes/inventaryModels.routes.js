import Router from "express";
import { verifyToken } from "../middleware/index.js";
import { getInventaryModels } from "../controllers/inventaryModels.controller.js";

const router = Router();

router.get("/inventaryModels", verifyToken, getInventaryModels);

export default router;
