import express from "express";
import {
  getDashboard,
  getReportsByMonth,
} from "../../controllers/Insurance/reportsController.js";

const router = express.Router();

router.get("/get-dashboard", getDashboard);
router.get("/get-reports-by-month", getReportsByMonth);


export default router;
