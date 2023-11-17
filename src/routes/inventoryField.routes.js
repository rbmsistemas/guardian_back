import Router from "express";

import {
  createInventoryField,
  getAllInventoryFields,
  getInventoryFieldById,
  updateInventoryField,
  deleteInventoryField,
} from "../controllers/inventoryField.controller.js";

const router = Router();

router.get("/inventoryFields", getAllInventoryFields);
router.get("/inventoryFields/:id", getInventoryFieldById);
router.post("/inventoryFields", createInventoryField);
router.patch("/inventoryFields/:id", updateInventoryField);
router.delete("/inventoryFields/:id", deleteInventoryField);

export default router;
