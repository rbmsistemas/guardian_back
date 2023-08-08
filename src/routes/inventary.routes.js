import Router from "express";
import {
  createInventary,
  deleteInventaryById,
  getInventaryById,
  updateInventaryById,
  getInventaryByModelId,
  getInventaryByTypeId,
  getInventarys,
} from "../controllers/inventary.controller.js";
import { verifyToken } from "../middleware/index.js";

const router = Router();

router.get("/inventarys", verifyToken, getInventarys);
router.get("/inventarys/:id", verifyToken, getInventaryById);
router.get("/inventarys/model/:id", verifyToken, getInventaryByModelId);
router.get("/inventarys/type/:id", verifyToken, getInventaryByTypeId);
router.post("/inventarys", verifyToken, createInventary);
router.put("/inventarys/:id", verifyToken, updateInventaryById);
router.delete("/inventarys/:id", verifyToken, deleteInventaryById);

export default router;
