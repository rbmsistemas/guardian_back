import Router from "express";
import { verifyToken } from "../middleware/index.js";
import { getInventoryTypes } from "../controllers/inventoryType.controller.js";

const router = Router();

router.get("/inventoryTypes", verifyToken, getInventoryTypes);

export default router;
