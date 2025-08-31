import express from "express";
import {
  addInsurance,
  deleteInsurance,
  getInsurances,
} from "../controllers/insuranceController.js";

const router = express.Router();
router.post("/add-insurance", addInsurance);
router.get("/get-insurances", getInsurances);
router.delete("/delete-insurance/:id", deleteInsurance);
export default router;
