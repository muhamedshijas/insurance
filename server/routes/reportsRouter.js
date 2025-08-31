import express from "express";
import { getDashboard } from "../controllers/reportsController.js";

const router = express.Router();

router.get("/get-dashboard", getDashboard);

export default router;
