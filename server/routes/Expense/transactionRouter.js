import express from "express";
import {
  addTransaction,
  getTransactions,
  getTransactionsByBank,
  transferMoney,
} from "../../controllers/Expense/transactionsController.js";
import { getDashboard } from "../../controllers/Expense/dashBoardController.js";

const router = express.Router();
router.post("/transfer-money", transferMoney);
router.get("/get-transactions", getTransactions);
router.post("/add-transaction", addTransaction);
router.get("/get-recent-transactions/:id", getTransactionsByBank);

export default router;
