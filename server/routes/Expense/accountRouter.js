import express from "express";
import {
  addNewAccount,
  getBanks,
} from "../../controllers/Expense/accountController.js";

const router = express.Router();

router.post("/add-acc", addNewAccount);
router.get("/get-acc", getBanks);
export default router;
