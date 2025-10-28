import accountModel from "../../models/accountModel.js";
import transactionModel from "../../models/transactionModel.js";

export async function transferMoney(req, res) {
  try {
    const { amount, from, to, desc } = req.body;

    // 1️⃣ Validate input
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

    // 2️⃣ Fetch both banks
    const fromBank = await accountModel.findById(from);
    const toBank = await accountModel.findById(to);

    if (!fromBank || !toBank) {
      return res
        .status(404)
        .json({ success: false, message: "One or both banks not found." });
    }

    // 3️⃣ Check balance
    if (fromBank.amountAvailable < amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance in source bank.",
      });
    }

    // 4️⃣ Update balances
    fromBank.amountAvailable -= amount;
    toBank.amountAvailable += amount;

    await fromBank.save();
    await toBank.save();

    // 5️⃣ Create transaction (store the updated balance in transaction)
    const newTransaction = await transactionModel.create({
      type: "Transfer",
      description:
        desc || `Transfer from ${fromBank.bankName} to ${toBank.bankName}`,
      amount,
      bank: fromBank._id,
      balance: fromBank.amountAvailable, // balance snapshot after deduction
      transferDetails: {
        fromBank: fromBank._id,
        toBank: toBank._id,
      },
    });

    // Optionally, create a transaction for the receiving bank as "Income"
    await transactionModel.create({
      type: "Income",
      description: `Received transfer from ${fromBank.bankName}`,
      amount,
      bank: toBank._id,
      balance: toBank.amountAvailable, // balance snapshot after addition
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
  const transactions = await transactionModel.find({}).populate("bank").lean().sort({date:-1});

  return res.json({ transactions });
}

export async function addTransaction(req, res) {
  try {
    const { bankId, amount, category, description } = req.body;

    // Basic validation
    if (!bankId || !amount || !category) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const bank = await accountModel.findById(bankId);

    if (!bank) {
      return res.json({
        success: false,
        message: "Bank account not found",
      });
    }

    let updatedBalance = bank.amountAvailable;

    // Update balance based on category
    if (category === "Expense") {
      if (Number(amount) > Number(bank.amountAvailable)) {
        return res.json({
          success: false,
          message: "Insufficient balance in the selected bank",
        });
      }
      updatedBalance = Number(bank.amountAvailable) - Number(amount);
    } else if (category === "Income") {
      updatedBalance = Number(bank.amountAvailable) + Number(amount);
    } else {
      return res.json({
        success: false,
        message: "Invalid transaction category",
      });
    }

    // Update the bank balance
    await accountModel.updateOne(
      { _id: bankId },
      { $set: { amountAvailable: updatedBalance } }
    );

    // Create the transaction record with updated balance
    const newTransaction = await transactionModel.create({
      bank: bankId,
      amount: Number(amount),
      type: category,
      description,
      balance: updatedBalance, // 🆕 Store balance snapshot after transaction
    });
 

    return res.json({
      success: true,
      message: "Transaction added successfully",
      transaction: newTransaction,
    });
  } catch (err) {
    console.error(err);
    return res.json({
      success: false,
      message: "Something went wrong while adding transaction",
    });
  }
}

export async function getTransactionsByBank(req, res) {
  try {
    const { id } = req.params; // or req.query if you're using ?id=
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Bank ID is required" });
    }

    const transactions = await transactionModel
      .find({ bank: id })
      .sort({ date: -1 }) // sort newest first
      .limit(5)
      .lean();

    if (!transactions.length) {
      return res.json({ success: false, message: "No Transactions Found" });
    }

    return res.json({
      success: true,
      transactions,
      message: "Transactions fetched successfully",
    });
  } catch (err) {
    console.error("Error fetching transactions:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching transactions",
    });
  }
}


