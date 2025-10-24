import express from "express";
import {
  addTransaction,
  getTransactions,
  transferMoney,
} from "../../controllers/Expense/transactionsController.js";

const router = express.Router();
router.post("/transfer-money", transferMoney);
router.get("/get-transactions", getTransactions);
router.post("/add-transaction", addTransaction);
export default router;
