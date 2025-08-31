import CompanyModel from "../models/companyModel.js";
import InsuranceModel from "../models/InsuranceModel.js";
import PolicyModel from "../models/policyModel.js";

// Application summary logic
export async function fetchApplicationSummary() {
  const total = await InsuranceModel.countDocuments();
  const approved = await InsuranceModel.countDocuments({ status: "Approved" });
  const pending = await InsuranceModel.countDocuments({ status: "Pending" });
  const rejected = await InsuranceModel.countDocuments({ status: "Rejected" });

  return { total, approved, pending, rejected };
}

// Payment summary logic
export async function fetchPaymentSummary() {
  const insurances = await InsuranceModel.find();

  let totalAmount = 0;
  let totalCommission = 0;

  insurances.forEach((item) => {
    totalAmount += Number(item.net) + Number(item.premium);
    totalCommission += Number(item.comm);
  });

  return { totalAmount, totalCommission };
}

// Companies with count including 0
export async function fetchCountOfCompanies() {
  const result = await CompanyModel.aggregate([
    {
      $lookup: {
        from: "insurances", // collection of InsuranceModel
        localField: "_id", // company._id
        foreignField: "company", // insurance.company
        as: "insuranceDocs",
      },
    },
    {
      $project: {
        companyName: "$name",
        count: { $size: "$insuranceDocs" }, // 0 if no matches
      },
    },
  ]);
  return result;
}

// Policies with count including 0
export async function fetchCountOfPolicies() {
  const result = await PolicyModel.aggregate([
    {
      $lookup: {
        from: "insurances", // collection of InsuranceModel
        localField: "_id", // policy._id
        foreignField: "policyType", // insurance.policyType
        as: "insuranceDocs",
      },
    },
    {
      $project: {
        policyName: "$name",
        count: { $size: "$insuranceDocs" }, // 0 if no matches
      },
    },
  ]);
  return result;
}

export const getMonthlyIncomeAndCommission = async () => {
  const pipeline = [
    {
      $group: {
        _id: { $month: "$date" },
        totalNet: { $sum: "$net" },
        totalPremium: { $sum: "$premium" },
        totalCommission: { $sum: "$comm" },
      },
    },
    {
      $project: {
        month: {
          $arrayElemAt: [
            [
              "",
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            "$_id",
          ],
        },
        collection: { $add: ["$totalNet", "$totalPremium"] },
        commission: "$totalCommission",
      },
    },
    { $sort: { _id: 1 } },
  ];

  return InsuranceModel.aggregate(pipeline);
};
