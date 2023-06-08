import Router from "express";
import {
  createProveedor,
  getProveedores,
  getProveedorById,
  updateProveedorById,
  deleteProveedorById,
  getProveedoresByStatus,
} from "../controllers/proveedores.controller.js";
import { verifyToken } from "../middleware/index.js";

const router = Router();

router.post("/proveedores", verifyToken, createProveedor);

router.get("/proveedores", verifyToken, getProveedores);

router.get("/proveedores/:id", verifyToken, getProveedorById);

router.patch("/proveedores/:id", verifyToken, updateProveedorById);

router.delete("/proveedores/:id", verifyToken, deleteProveedorById);

router.get("/proveedores/status/:status", verifyToken, getProveedoresByStatus);

export default router;
