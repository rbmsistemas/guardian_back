import Router from "express";
import { verifyToken } from "../middleware/index.js";
import {
  getInventoryModels,
  getInventoryModelById,
  getInventoryModelsByParams,
} from "../controllers/inventoryModel.controller.js";

const router = Router();

router.get("/inventoryModels", verifyToken, getInventoryModels);
router.get("/inventoryModels/:id", verifyToken, getInventoryModelById);
router.post("/inventoryModels/search", verifyToken, getInventoryModelsByParams);

export default router;
