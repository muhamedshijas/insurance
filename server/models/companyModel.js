// models/Company.js
import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    address: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const CompanyModel = mongoose.model("Company", companySchema);
export default CompanyModel;
