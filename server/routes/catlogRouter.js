import express from "express";
import {
  addCompany,
  addPolicy,
  deleteCompany,
  getCompanies,
} from "../controllers/catlogController.js";

const router = express.Router();
router.post("/add-policy", addPolicy);
router.post("/add-company", addCompany);
router.get("/get-companies", getCompanies);
router.delete("/delete-company/:id", deleteCompany);

export default router;
