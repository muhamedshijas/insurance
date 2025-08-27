import express from "express";
import {
  addCompany,
  addPolicy,
  deleteCompany,
  deletePolicy,
  getCompanies,
  getPolicies,
} from "../controllers/catlogController.js";

const router = express.Router();
router.post("/add-company", addCompany);
router.get("/get-companies", getCompanies);
router.delete("/delete-company/:id", deleteCompany);

router.post("/add-policy", addPolicy);
router.get("/get-policies", getPolicies);
router.delete("/delete-policy/:id",deletePolicy);

export default router;
