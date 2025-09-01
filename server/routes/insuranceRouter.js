import express from "express";
import {
  addInsurance,
  deleteInsurance,
  getInsuranceById,
  getInsurances,
  updateStatus,
} from "../controllers/insuranceController.js";

const router = express.Router();
router.post("/add-insurance", addInsurance);
router.get("/get-insurances", getInsurances);
router.delete("/delete-insurance/:id", deleteInsurance);
router.get("/get-insurancebyid/:id", getInsuranceById);
router.post("/update-status", updateStatus);
export default router;
