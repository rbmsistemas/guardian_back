import Router from "express";
import {
  createInventary,
  deleteInventaryById,
  getInventaryById,
  updateInventaryById,
  getInventaryByTypeId,
  getInventarys,
  getInventariesByParams,
  getValidateActivoSN,
} from "../controllers/inventary.controller.js";
import { verifyToken } from "../middleware/index.js";

const router = Router();

router.get("/inventarys", verifyToken, getInventarys);
router.get("/inventarys/:id", verifyToken, getInventaryById);
router.get("/inventarys/type/:id", verifyToken, getInventaryByTypeId);
router.post("/inventarys/validateActivoSn", verifyToken, getValidateActivoSN);
router.post("/inventarys", verifyToken, createInventary);
router.patch("/inventarys/:id", verifyToken, updateInventaryById);
router.delete("/inventarys/:id", verifyToken, deleteInventaryById);
router.post("/inventarys/search", verifyToken, getInventariesByParams);

export default router;
