import Router from "express";
import {
  createInventory,
  deleteInventoryById,
  getInventoryById,
  updateInventoryById,
  getInventoryByTypeId,
  getInventories,
  getInventoriesByParams,
  getValidateSerialNumber,
  getValidateActivo,
} from "../controllers/inventory.controller.js";
import { verifyToken } from "../middleware/index.js";

const router = Router();

router.get("/inventories", verifyToken, getInventories);
router.get("/inventories/:id", verifyToken, getInventoryById);
router.get("/inventories/type/:id", verifyToken, getInventoryByTypeId);
router.post(
  "/inventories/validateSerialNumber",
  verifyToken,
  getValidateSerialNumber
);
router.post("/inventaries/validateActivo", verifyToken, getValidateActivo);
router.post("/inventaries", verifyToken, createInventory);
router.patch("/inventaries/:id", verifyToken, updateInventoryById);
router.delete("/inventaries/:id", verifyToken, deleteInventoryById);
router.post("/inventaries/search", verifyToken, getInventoriesByParams);

export default router;
