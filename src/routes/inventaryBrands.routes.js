import Router from "express";
import { verifyToken } from "../middleware/index.js";
import { getInventaryBrands } from "../controllers/inventaryBrands.controller.js";

const router = Router();

router.get("/inventaryBrands", verifyToken, getInventaryBrands);

export default router;
