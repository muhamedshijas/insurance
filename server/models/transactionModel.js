import mongoose from "mongoose";

const transferDetailsSchema = new mongoose.Schema({
  fromBank: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bank",
    required: true,
  },
  toBank: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bank",
    required: true,
  },
});

const transactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  type: {
    type: String,
    enum: ["Expense", "Income", "Transfer"],
    required: true,
  },
  bank: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bank",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  transferDetails: {
    type: transferDetailsSchema,
    required: function () {
      return this.type === "Transfer";
    },
  },
});

// Ensure `transferDetails` is not saved if type != "Transfer"
transactionSchema.pre("save", function (next) {
  if (this.type !== "Transfer") {
    this.transferDetails = undefined; // Remove the field
  }
  next();
});

const transactionModel = mongoose.model("Transaction", transactionSchema);
export default transactionModel;
