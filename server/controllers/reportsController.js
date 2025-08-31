import {
  fetchApplicationSummary,
  fetchCountOfCompanies,
  fetchCountOfPolicies,
  fetchPaymentSummary,
  getMonthlyIncomeAndCommission,
} from "../helpers/reports.js";

export async function getDashboard(req, res) {
  try {
   
    
    const applicationSummary = await fetchApplicationSummary();
    const paymentSummary = await fetchPaymentSummary();
    const companyCount = await fetchCountOfCompanies();
    const policyCount = await fetchCountOfPolicies();
    const monthlyPayments= await getMonthlyIncomeAndCommission()
    console.log(monthlyPayments);
    
    return res.json({
      success: true,
      applicationSummary: applicationSummary,
      paymentSummary: paymentSummary,
      companiesCount: companyCount,
      policiesCount: policyCount,
      monthlyData:monthlyPayments
    });
  } catch (err) {}
}
