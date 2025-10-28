export function calculateTotalAmount(accounts) {
  if (!Array.isArray(accounts)) return 0;
  return accounts.reduce((sum, acc) => sum + (acc.amountAvailable || 0), 0);
}
export function pickBankDetails(accounts) {
  if (!Array.isArray(accounts)) return [];
  return accounts.map((acc) => ({
    bankName: acc.bankName || "",
    amountAvailable: acc.amountAvailable || 0,
  }));
}

export const getTotals = (transactions) => {
  let totalIncome = 0;
  let totalExpense = 0;
  let totalTransfers = 0;

  transactions.forEach((txn) => {
    if (txn.type === "Income") totalIncome += txn.amount;
    else if (txn.type === "Expense") totalExpense += txn.amount;
    else if (txn.type === "Transfer") totalTransfers += txn.amount;
  });

  return { totalIncome, totalExpense, totalTransfers };
};

export const getDataByBank = (transactions) => {
  const dataByBank = {};

  transactions.forEach((txn) => {
    // Get the bank ID and name
    const bankId =
      typeof txn.bank === "object" && txn.bank?._id
        ? txn.bank._id.toString()
        : txn.bank;

    const bankName =
      typeof txn.bank === "object" && txn.bank?.bankName
        ? txn.bank.bankName
        : "Unknown Bank";

    // Initialize if not exists
    if (!dataByBank[bankId]) {
      dataByBank[bankId] = {
        _id: bankId,
        bankName,
        income: 0,
        expense: 0,
        transfer: 0,
      };
    }

    // Add up totals by type
    if (txn.type === "Income") dataByBank[bankId].income += txn.amount;
    else if (txn.type === "Expense") dataByBank[bankId].expense += txn.amount;
    else if (txn.type === "Transfer") dataByBank[bankId].transfer += txn.amount;
  });

  // Convert object to array
  return Object.values(dataByBank);
};

export const getRecentTransactions = (transactions, limit = 5) => {
  // Sort by date (latest first)
  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Take top `limit` and simplify bank info
  const recent = sorted.slice(0, limit).map((txn) => ({
    _id: txn._id,
    type: txn.type,
    bankName:
      typeof txn.bank === "object" && txn.bank?.bankName
        ? txn.bank.bankName
        : "Unknown Bank",
    description: txn.description,
    amount: txn.amount,
    balance: txn.balance,
    date: txn.date,
  }));

  return recent;
};
