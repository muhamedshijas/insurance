import CompanyModel from "../models/companyModel.js";
import InsuranceModel from "../models/InsuranceModel.js";
import PolicyModel from "../models/policyModel.js";

export async function addInsurance(req, res) {
  try {
    const {
      date,
      branch,
      agent,
      customerName,
      vehicleNumber,
      policyType,
      inspectionPhoto,
      company,
      net,
      premium,
      comm,
    } = req.body;

    // 🔎 Validate required fields (basic check)
    if (
      !date ||
      !branch ||
      !agent ||
      !customerName ||
      !vehicleNumber ||
      !policyType ||
      !company ||
      !net ||
      !premium ||
      !comm
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    // 🔎 Find Company
    const companyDoc = await CompanyModel.findOne({ name: company.trim() });
    if (!companyDoc) {
      return res.status(404).json({
        success: false,
        message: `Company '${company}' not found`,
      });
    }

    // 🔎 Find Policy
    const policyDoc = await PolicyModel.findOne({ name: policyType.trim() });
    if (!policyDoc) {
      return res.status(404).json({
        success: false,
        message: `Policy '${policyType}' not found`,
      });
    }

    // 📝 Create new Insurance
    const insurance = new InsuranceModel({
      date,
      branch,
      agent,
      customerName,
      vehicleNumber,
      inspectionPhoto,
      company: companyDoc._id, // ref to Company
      policyType: policyDoc._id, // ref to Policy
      net: Number(net),
      premium: Number(premium),
      comm: Number(comm),
    });

    await insurance.save();

    return res.status(201).json({
      success: true,
      message: "Insurance added successfully",
      data: insurance,
    });
  } catch (err) {
    console.error("❌ Error adding insurance:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function getInsurances(req, res) {
  try {
    const insurances = await InsuranceModel.find()
      .lean()
      .populate("company")
      .populate("policyType");
    return res.json({ success: true, insurances });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Internal Server Error" });
  }
}
export async function deleteInsurance(req, res) {
  try {
    const { id } = req.params;
    await InsuranceModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Insurance deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting policy" });
  }
}

export async function getInsuranceById(req, res) {
  try {
    const { id } = req.params;
    const insurance = await InsuranceModel.findOne({ _id: id })
      .populate("company")
      .populate("policyType")
      .lean();
    if (!insurance) {
      return res.json({ success: false, message: "No data Found" });
    }
    return res.json({ success: true, insurance });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Internal Sever Error" });
  }
}

export async function updateStatus(req, res) {
  try {
    const { id, status } = req.body;
    await InsuranceModel.updateOne({ _id: id }, { $set: { status: status } });
    return res.json({ success: true, message: "Updated Successfully" });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Internal Server Error" });
  }
}
