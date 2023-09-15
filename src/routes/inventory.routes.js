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
router.post("/inventories/validateActivo", verifyToken, getValidateActivo);
router.post("/inventories", verifyToken, createInventory);
router.patch("/inventories/:id", verifyToken, updateInventoryById);
router.delete("/inventories/:id", verifyToken, deleteInventoryById);
router.post("/inventories/search", verifyToken, getInventoriesByParams);

export default router;
