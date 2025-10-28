import accountModel from "../../models/accountModel.js";
import transactionModel from "../../models/transactionModel.js";
import {
  calculateTotalAmount,
  getDataByBank,
  getRecentTransactions,
  getTotals,
  pickBankDetails,
} from "../../Utils/calculater.js";

export async function getDashboard(req, res) {
  const totalAcc = await accountModel.find({}).lean();
  const transactions = await transactionModel.find({}).lean().populate("bank");
  const totalAmount = await calculateTotalAmount(totalAcc);
  const AmountByBank = await pickBankDetails(totalAcc);
  const totalData = await getTotals(transactions);
  const dataByBank = await getDataByBank(transactions);
  const recentTransaction = await getRecentTransactions(transactions);
  return res.json({ success: true, totalData, dataByBank, recentTransaction });
}
