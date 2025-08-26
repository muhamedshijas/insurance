// models/Policy.js
import mongoose from "mongoose";

const policySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const PolicyModel = mongoose.model("Policy", policySchema);
export default PolicyModel;
