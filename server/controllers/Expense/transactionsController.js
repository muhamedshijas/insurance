import accountModel from "../../models/accountModel.js";
import transactionModel from "../../models/transactionModel.js";

export async function transferMoney(req, res) {
  try {
    const { amount, from, to, desc } = req.body;

    // ✅ 1. Validate input
    if (!amount || !from || !to) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    if (from === to) {
      return res
        .status(400)
        .json({ success: false, message: "Cannot transfer to the same bank." });
    }

    // ✅ 2. Fetch both banks
    const fromBank = await accountModel.findById(from);
    const toBank = await accountModel.findById(to);

    if (!fromBank || !toBank) {
      return res
        .status(404)
        .json({ success: false, message: "One or both banks not found." });
    }

    // ✅ 3. Check balance
    if (fromBank.amountAvailable < amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance in source bank.",
      });
    }

    // ✅ 4. Update balances
    fromBank.amountAvailable -= amount;
    toBank.amountAvailable += amount;

    await fromBank.save();
    await toBank.save();

    // ✅ 5. Create transaction
    const newTransaction = await transactionModel.create({
      type: "Transfer",
      description:
        desc || `Transfer from ${fromBank.bankName} to ${toBank.bankName}`,
      amount,
      bank: from,
      transferDetails: {
        fromBank: from, // must be ObjectId, not object
        toBank: to, // same here
      },
    });

    return res.status(200).json({
      success: true,
      message: "Transfer completed successfully",
      transaction: newTransaction,
    });
  } catch (err) {
    console.error("💥 Transfer Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while transferring",
      error: err.message,
    });
  }
}
export async function getTransactions(req, res) {
  const transactions = await transactionModel.find({}).populate('bank').lean();
 
  return res.json({ transactions });
}
