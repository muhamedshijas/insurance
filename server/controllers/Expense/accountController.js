import accountModel from "../../models/accountModel.js";

export async function addNewAccount(req, res) {
  try {
    const { bankName, accNo, amountAvailable } = req.body;

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

    // Create new account
    const newAcc = await accountModel.create({
      bankName,
      accNo,
      amountAvailable,
    });

    console.log("✅ New Account Created:", newAcc);
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

export async function getBanks(req, res) {
  const banks = await accountModel.find().lean();
  console.log(banks);
  return res.json({
    success: true,
    message: "banks fecthed Successfully",
    banks,
  });
}
