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
      type: Number,
      default: 0,
    },
    amountAvailable: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const accountModel = mongoose.model("Bank", accountSchema);
export default accountModel;
