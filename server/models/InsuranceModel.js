import mongoose from "mongoose";

const insuranceSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    agent: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
      trim: true,
    },
    policyType: {
      type: mongoose.Schema.Types.ObjectId, // Reference Policy
      ref: "Policy",
      required: true,
    },
    inspectionPhoto: {
      type: String,
      enum: ["Yes", "No"], // 👈 restrict to Yes/No
      default: "No",
    },
    company: {
      type: mongoose.Schema.Types.ObjectId, // Reference Company
      ref: "Company",
      required: true,
    },
    net: {
      type: Number,
      required: true,
    },
    premium: {
      type: Number,
      required: true,
    },
    comm: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

const InsuranceModel = mongoose.model("Insurance", insuranceSchema);
export default InsuranceModel;
