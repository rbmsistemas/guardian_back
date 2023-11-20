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
  getInventoriesBySearch,
  getInventoryGroups,
} from "../controllers/inventory.controller.js";
import { verifyToken } from "../middleware/index.js";
import ping from "ping";

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
router.post("/inventories/params", verifyToken, getInventoriesByParams);
router.post("/inventories/search", verifyToken, getInventoriesBySearch);
router.post("/inventories/groups", verifyToken, getInventoryGroups);

router.post("/inventories/ping", async (req, res) => {
  const { ipAddress } = req.body;
  const result = await ping.promise.probe(ipAddress);
  res.status(200).json(result);
});

export default router;
