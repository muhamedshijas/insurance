import express from "express";
import {
  addNewAccount,
  deleteAcc,
  getAccById,
  getAccs,
} from "../../controllers/Expense/accountController.js";
import { getDashboard } from "../../controllers/Expense/dashBoardController.js";

const router = express.Router();

router.post("/add-acc", addNewAccount);
router.get("/get-acc", getAccs);
router.get("/get-accbyid/:id", getAccById);
router.delete("/delete-acc/:id", deleteAcc);
router.get("/", getDashboard);
export default router;
