// models/Company.js
import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    bankName: {
      type: String,
      required: true,
      trim: true,
    },
    accNo: {
      type: String, // safer for account numbers with leading zeros
      required: true,
      trim: true,
    },
    ifscCode: {
      type: String,
      required: true,
      trim: true,
    },
    branch: {
      type: String,
      trim: true,
    },
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },
    mobileNo: {
      type: String,
      trim: true,
    },
    accountType: {
      type: String,
      enum: ["Savings", "Current", "Fixed Deposit", "Recurring Deposit"],
      default: "Savings",
    },
    accountInfo: {
      type: String,
      enum: ["Self","Business","Others"],
      default: "Self",
    },
    amountAvailable: {
      type: Number,
      default: 0,
    },
    branchAddress: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const accountModel = mongoose.model("Bank", accountSchema);
export default accountModel;
