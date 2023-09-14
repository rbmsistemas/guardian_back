import Router from "express";
import {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompanyById,
  deleteCompanyById,
  getCompaniesByParams,
} from "../controllers/company.controller.js";
import { verifyToken } from "../middleware/index.js";

const router = Router();

router.post("/company", verifyToken, createCompany);

router.get("/company", verifyToken, getCompanies);

router.get("/company/:id", verifyToken, getCompanyById);

router.patch("/company/:id", verifyToken, updateCompanyById);

router.delete("/company/:id", verifyToken, deleteCompanyById);

router.post("/company/search", verifyToken, getCompaniesByParams);

export default router;
