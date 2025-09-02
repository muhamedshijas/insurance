import InsuranceModel from "../models/InsuranceModel.js";
import { fetchApplicationSummary, fetchPaymentSummary } from "./reports.js";

export async function fetchApplicationSummaryByMonth(month) {
  try {
    // if "All" just return full summary
    if (month === "All") {
      return await fetchApplicationSummary();
    }

    const year = new Date().getFullYear(); // you can also pass year from frontend if needed
    const startDate = new Date(year, month - 1, 1); // first day of month
    const endDate = new Date(year, month, 0, 23, 59, 59); // last day of month

    const total = await InsuranceModel.countDocuments({
      createdAt: { $gte: startDate, $lte: endDate },
    });

    const approved = await InsuranceModel.countDocuments({
      status: "Approved",
      createdAt: { $gte: startDate, $lte: endDate },
    });

    const pending = await InsuranceModel.countDocuments({
      status: "Pending",
      createdAt: { $gte: startDate, $lte: endDate },
    });

    const rejected = await InsuranceModel.countDocuments({
      status: "Rejected",
      createdAt: { $gte: startDate, $lte: endDate },
    });

    return { total, approved, pending, rejected };
  } catch (err) {
    console.error("Error fetching application summary by month:", err);
    throw err;
  }
}

export async function fetchPaymentSummaryByMonth(month) {
  if (month === "All") {
    return await fetchPaymentSummary();
  }
  const year = new Date().getFullYear(); // you can also pass year from frontend if needed
  const startDate = new Date(year, month - 1, 1); // first day of month
  const endDate = new Date(year, month, 0, 23, 59, 59);

  const insurances = await InsuranceModel.find({
    createdAt: { $gte: startDate, $lte: endDate },
  });

  let totalAmount = 0;
  let totalCommission = 0;

  insurances.forEach((item) => {
    totalAmount += Number(item.net) + Number(item.premium);
    totalCommission += Number(item.comm);
  });

  return { totalAmount, totalCommission };
}

export async function fetchInsurances(month) {
  if (month === "All") {
    const insurances = await InsuranceModel.find()
      .lean()
      .limit(5)
      .populate("policyType")
      .populate("company");
    return insurances;
  }
  const year = new Date().getFullYear(); // you can also pass year from frontend if needed
  const startDate = new Date(year, month - 1, 1); // first day of month
  const endDate = new Date(year, month, 0, 23, 59, 59);
  const insurances = await InsuranceModel.find({
    createdAt: { $gte: startDate, $lte: endDate },
  })
    .limit(5)
    .populate("policyType")
    .populate("company");
  return insurances;
}
