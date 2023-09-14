import Router from "express";
import { verifyToken } from "../middleware/index.js";
import { getInventoryBrands } from "../controllers/inventoryBrand.controller.js";

const router = Router();

router.get("/inventoryBrands", verifyToken, getInventoryBrands);

export default router;
