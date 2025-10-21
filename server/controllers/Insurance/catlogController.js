import CompanyModel from "../../models/companyModel.js";
import PolicyModel from "../../models/policyModel.js";


export async function addCompany(req, res) {
  try {
    const { companyName } = req.body;

    const exist = await CompanyModel.findOne({ name: companyName });
    if (exist) {
      return res
        .status(400)
        .json({ success: false, message: "Company already exists" });
    }

    const newCompany = new CompanyModel({ name: companyName });
    await newCompany.save();

    return res.status(201).json({
      success: true,
      message: "Policy created successfully",
      data: newCompany,
    });
  } catch (error) {
    console.error("Error while adding company:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function getCompanies(req, res) {
  try {
    const companies = await CompanyModel.find().lean();
    return res.json({ success: true, companies });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "internal sever error" });
  }
}

export async function deleteCompany(req, res) {
  try {
    const { id } = req.params;
    await CompanyModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Company deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting company" });
  }
}

export async function addPolicy(req, res) {
  try {
    const { policy } = req.body;

    // check if policy already exists
    const exist = await PolicyModel.findOne({ name: policy });
    if (exist) {
      return res
        .status(400)
        .json({ success: false, message: "Policy already exists" });
    }

    // create new policy
    const newPolicy = new PolicyModel({ name: policy });
    await newPolicy.save();

    return res.status(201).json({
      success: true,
      message: "Policy created successfully",
      data: newPolicy,
    });
  } catch (error) {
    console.error("Error while adding policy:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function getPolicies(req, res) {
  try {
    const policies = await PolicyModel.find().lean();
    return res.json({ success: true, policies });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "internal sever error" });
  }
}

export async function deletePolicy(req, res) {
  try {
    const { id } = req.params;
    await PolicyModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Company deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting policy" });
  }
}
