import {
  fetchApplicationSummary,
  fetchCountOfCompanies,
  fetchCountOfPolicies,
  fetchPaymentSummary,
  getMonthlyIncomeAndCommission,
} from "../../helpers/reports.js";
import {
  fetchApplicationSummaryByMonth,
  fetchInsurances,
  fetchPaymentSummaryByMonth,
} from "../../helpers/reportsbyMonth.js";


export async function getDashboard(req, res) {
  try {
    const applicationSummary = await fetchApplicationSummary();
    const paymentSummary = await fetchPaymentSummary();
    const companyCount = await fetchCountOfCompanies();
    const policyCount = await fetchCountOfPolicies();
    const monthlyPayments = await getMonthlyIncomeAndCommission();
    return res.json({
      success: true,
      applicationSummary: applicationSummary,
      paymentSummary: paymentSummary,
      companiesCount: companyCount,
      policiesCount: policyCount,
      monthlyData: monthlyPayments,
    });
  } catch (err) {}
}

export async function getReportsByMonth(req, res) {
  try {
    const { month } = req.query;
    const applicationSummary = await fetchApplicationSummaryByMonth(month);
    const paymentSummary = await fetchPaymentSummaryByMonth(month);
    const recents = await fetchInsurances(month);
    return res.json({
      success: true,
      applicationSummary: applicationSummary,
      paymentSummary: paymentSummary,
      recents: recents,
    });
  } catch (err) {
    console.log(err);
  }
}
