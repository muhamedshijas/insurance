import accountModel from "../../models/accountModel.js";
import transactionModel from "../../models/transactionModel.js";

export async function addNewAccount(req, res) {
  try {
    const {
      bankName,
      accNo,
      ifscCode,
      branch,
      branchAddress,
      ownerName,
      mobileNo,
      accountInfo,
      accountType,
      amountAvailable,
    } = req.body;

    // Validate required fields
    if (!bankName || !accNo || amountAvailable === undefined) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if account already exists
    const isExist = await accountModel.findOne({ accNo }).lean();
    if (isExist) {
      return res
        .json({ success: false, message: "Account already exists" })
        .status(400);
    }

    // // Create new account
    const newAcc = await accountModel.create({
      bankName,
      accNo,
      ifscCode,
      branch,
      branchAddress,
      ownerName,
      mobileNo,
      accountInfo,
      accountType,
      amountAvailable,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: newAcc,
    });
  } catch (error) {
    console.error("❌ Error creating account:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
}

export async function getAccs(req, res) {
  try {
    const banks = await accountModel.find().lean();
    return res.json({
      success: true,
      message: "banks fecthed Successfully",
      banks,
    });
  } catch (err) {
    return res.json({
      success: false,
      message: "banks fetching Failed",
    });
  }
}
export async function getAccById(req, res) {
  try {
    const id = req.params.id;
    const bank = await accountModel.findOne({ _id: id }).lean();
  
    
    return res.json({
      success: true,
      bank,
      message: "bank fetching Successfull",
    });
  } catch (err) {
    return res.json({
      success: false,
      message: "banks fetching Failed",
    });
  }
}

export async function deleteAcc(req, res) {
  try {
    const { id } = req.params;

    // Check if bank exists
    const bank = await accountModel.findById(id);
    if (!bank) {
      return res.status(404).json({
        success: false,
        message: "Bank account not found",
      });
    }

    // Delete all transactions linked to this bank
    await transactionModel.deleteMany({ bank: id });

    // Delete the bank itself
    await accountModel.findByIdAndDelete(id);

    return res.json({
      success: true,
      message: "Bank and all related transactions deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting bank:", err);
    return res.status(500).json({
      success: false,
      message: "Error deleting bank and related transactions",
    });
  }
}
