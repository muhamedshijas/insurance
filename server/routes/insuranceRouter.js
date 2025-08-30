import express from "express";
import { addInsurance, getInsurances } from "../controllers/insuranceController.js";

const router = express.Router();
router.post("/add-insurance", addInsurance);
router.get("/get-insurances",getInsurances)
export default router;
    