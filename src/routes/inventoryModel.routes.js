import Router from "express";
import { verifyToken } from "../middleware/index.js";
import { getInventoryModels } from "../controllers/inventoryModel.controller.js";

const router = Router();

router.get("/inventoryModels", verifyToken, getInventoryModels);

export default router;
