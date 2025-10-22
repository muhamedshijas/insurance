import express from "express";
import {
  getTransactions,
  transferMoney,
} from "../../controllers/Expense/transactionsController.js";

const router = express.Router();
router.post("/transfer-money", transferMoney);
router.get("/get-transactions", getTransactions);
export default router;
