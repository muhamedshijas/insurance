import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";
import { RefreshRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import TransferMoney from "../../modals/TranseferMoney";
import { useParams } from "react-router-dom";

function ViewBankPage({ refresh, setRefresh }) {
  const [bank, setBank] = useState(null);
  const [bankLoading, setBankLoading] = useState(true);
  const [bankError, setBankError] = useState(false);

  const [recentTransactions, setRecentTransactions] = useState([]);
  const [txLoading, setTxLoading] = useState(true);
  const [txError, setTxError] = useState(false);

  const [transferOpen, setTransferOpen] = useState(false);

  const { id } = useParams();

  // Fetch bank details
  useEffect(() => {
    if (!id) return;

    const fetchBank = async () => {
      try {
        setBankLoading(true);
        setBankError(false);
        const { data } = await axios.get(`/acc/get-accbyid/${id}`);
        if (data?.bank) setBank(data.bank);
        else setBankError(true);
      } catch {
        setBankError(true);
      } finally {
        setBankLoading(false);
      }
    };

    fetchBank();
  }, [id, refresh]);

  // Fetch recent transactions
  useEffect(() => {
    if (!id) return;

    const fetchRecentTransactions = async () => {
      try {
        setTxLoading(true);
        setTxError(false);
        const { data } = await axios.get(
          `/acc/transaction/get-recent-transactions/${id}`
        );
        if (data?.transactions) setRecentTransactions(data.transactions);
        else setRecentTransactions([]);
      } catch {
        setTxError(true);
      } finally {
        setTxLoading(false);
      }
    };

    fetchRecentTransactions();
  }, [id, refresh]);

  // Loading bank details
  if (bankLoading) {
    return (
      <FullPageCenter>
        <CircularProgress sx={{ color: "#6C4AB6" }} />
        <Typography mt={2}>Loading bank details...</Typography>
      </FullPageCenter>
    );
  }

  // Error loading bank details
  if (bankError || !bank) {
    return (
      <FullPageCenter>
        <Typography variant="h6" color="error" mb={2}>
          Failed to load bank details ❌
        </Typography>
        <Button
          variant="outlined"
          startIcon={<RefreshRounded />}
          onClick={() => window.location.reload()}
        >
          Reload
        </Button>
      </FullPageCenter>
    );
  }

  return (
    <Box
      p={4}
      minHeight="100vh"
      bgcolor="#f9f5ff"
      display="flex"
      flexDirection="column"
      gap={3}
    >
      {/* Top Section: Balance + Transfer Button */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="center"
      >
        <Paper
          elevation={3}
          sx={{
            flex: 1,
            p: 3,
            borderRadius: "16px",
            bgcolor: "#f3e8ff",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            maxWidth: 600,
          }}
        >
          <Typography variant="subtitle1" color="#6C4AB6">
            Total Balance
          </Typography>
          <Typography variant="h3" fontWeight="bold" color="#6C4AB6">
            ₹{bank.amountAvailable.toLocaleString()}
          </Typography>

          <Button
            variant="contained"
            sx={{
              mt: 1,
              bgcolor: "#6C4AB6",
              color: "white",
              py: 1.3,
              px: 5,
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": { bgcolor: "#55359a" },
            }}
            onClick={() => setTransferOpen(true)}
          >
            Transfer Money
          </Button>
        </Paper>
      </Box>

      {/* Bank Information */}
      <InfoCard title="Bank Information">
        <Field label="Bank Name" value={bank.bankName} />
        <Field label="Branch" value={bank.branch} />
        <Field label="IFSC Code" value={bank.ifscCode} />
        <Field label="Branch Address" value={bank.branchAddress} />
      </InfoCard>

      {/* Account Information */}
      <InfoCard title="Account Information">
        <Field label="Account Holder" value={bank.ownerName} />
        <Field label="Mobile Number" value={bank.mobileNo} />
        <Field label="Account Number" value={bank.accNo} />
        <Field label="Account Type" value={bank.accountType} />
        <Field label="Account Info" value={bank.accountInfo} />
        <Field
          label="Status"
          value={bank.isActive ? "Active ✅" : "Inactive ❌"}
        />
      </InfoCard>

      {/* Recent Transactions */}
      <Box mt={4}>
        <Typography
          variant="h6"
          fontWeight="bold"
          color="#6C4AB6"
          mb={2}
          textTransform="uppercase"
        >
          Recent Transactions
        </Typography>

        {txLoading ? (
          <Typography color="text.secondary" textAlign="center">
            Loading transactions...
          </Typography>
        ) : txError ? (
          <Typography color="error" textAlign="center">
            Failed to load transactions ❌
          </Typography>
        ) : recentTransactions.length > 0 ? (
          <Box display="flex" flexDirection="column" gap={2}>
            {recentTransactions.map((tx, i) => (
              <Paper
                key={i}
                elevation={2}
                sx={{
                  p: 2.5,
                  borderRadius: "14px",
                  bgcolor: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderLeft: `6px solid ${
                    tx.type === "Income" ? "#22c55e" : "#ef4444"
                  }`,
                }}
              >
                {/* Left side - Details */}
                <Box>
                  <Typography fontWeight="600" color="#333">
                    {tx.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tx.type}
                  </Typography>
                  <Typography variant="caption" color="#888">
                    {new Date(tx.date).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </Typography>
                </Box>

                {/* Right side - Amount and balance */}
                <Box textAlign="right">
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color={tx.type === "Income" ? "#22c55e" : "#ef4444"}
                  >
                    {tx.type === "Income" ? "+" : "-"}₹
                    {tx.amount.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="#6C4AB6" fontWeight="600">
                    Balance: ₹{tx.balance.toLocaleString()}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>
        ) : (
          <Typography color="text.secondary" textAlign="center" mt={2}>
            No recent transactions found.
          </Typography>
        )}
      </Box>

      {/* Transfer Modal */}
      {transferOpen && (
        <TransferMoney
          open={transferOpen}
          onClose={() => setTransferOpen(false)}
          bankId={bank?._id}
          bankName={bank?.bankName}
          amountAvailable={bank?.amountAvailable}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
    </Box>
  );
}

/* Reusable Components */
const InfoCard = ({ title, children }) => (
  <Paper
    elevation={2}
    sx={{
      p: 3,
      borderRadius: "16px",
      bgcolor: "white",
      display: "flex",
      flexDirection: "column",
      gap: 1.5,
    }}
  >
    <Typography
      variant="subtitle1"
      fontWeight="bold"
      color="#6C4AB6"
      textTransform="uppercase"
      mb={1.5}
    >
      {title}
    </Typography>
    {children}
  </Paper>
);

const Field = ({ label, value }) => (
  <Box
    display="flex"
    justifyContent="space-between"
    py={0.8}
    borderBottom="1px solid #eee"
  >
    <Typography fontWeight={600} color="#555">
      {label}
    </Typography>
    <Typography color="#333">{value || "-"}</Typography>
  </Box>
);

const FullPageCenter = ({ children }) => (
  <Box
    minHeight="100vh"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    bgcolor="#f9f5ff"
    gap={2}
  >
    {children}
  </Box>
);

export default ViewBankPage;
