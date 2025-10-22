import express from "express";
import {
  addNewAccount,
  deleteAcc,
  getAccById,
  getAccs,
} from "../../controllers/Expense/accountController.js";

const router = express.Router();

router.post("/add-acc", addNewAccount);
router.get("/get-acc", getAccs);
router.get("/get-accbyid/:id", getAccById);
router.delete("/delete-acc/:id", deleteAcc);

export default router;
