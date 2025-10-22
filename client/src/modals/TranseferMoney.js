import {
  Box,
  Typography,
  TextField,
  Button,
  Modal,
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";

function TransferMoney({
  open,
  onClose,
  bankId,
  bankName,
  amountAvailable,
  refresh,
  setRefresh,
}) {
  const [banks, setBanks] = useState([]);
  const [toBank, setToBank] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch banks when modal opens
  useEffect(() => {
    if (open) {
      (async function fetchBanks() {
        try {
          const { data } = await axios.get("/acc/get-acc");
          if (!data.err) setBanks(data.banks);
        } catch (err) {
          console.error(err);
          setError("Failed to load bank list.");
        }
      })();
    }
  }, [open]);

  // Real-time amount validation
  useEffect(() => {
    if (amount && Number(amount) > amountAvailable) {
      setError("Amount exceeds available balance.");
    } else {
      setError("");
    }
  }, [amount, amountAvailable]);

  const handleTransfer = async () => {
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const { data } = await axios.post("/acc/transaction/transfer-money", {
        from: bankId,
        to: toBank,
        amount: Number(amount),
        desc: note,
      });

      if (data.success) {
        setSuccessMsg("Transfer successful!");
        // Reset all fields
        setAmount("");
        setNote("");
        setToBank("");
        // Optional: refresh data in parent after success
        setTimeout(() => {
          setSuccessMsg("");
          onClose();
        }, 1200);
        setRefresh(!refresh);
      } else {
        setError(data.message || "Transfer failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled =
    !toBank ||
    !amount ||
    Number(amount) <= 0 ||
    Number(amount) > amountAvailable ||
    loading;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        bgcolor="white"
        borderRadius="16px"
        p={4}
        width="400px"
        boxShadow="0px 4px 10px rgba(0,0,0,0.15)"
        sx={{ transform: "translate(-50%, -50%)" }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          color="#5A3E9E"
          mb={3}
          textAlign="center"
        >
          Transfer Money
        </Typography>

        {/* From Bank */}
        <TextField
          label="From Bank"
          fullWidth
          size="small"
          value={bankName}
          sx={{ mb: 2 }}
          disabled
        />

        {/* To Bank */}
        <TextField
          select
          label="To Bank"
          fullWidth
          size="small"
          value={toBank}
          onChange={(e) => setToBank(e.target.value)}
          sx={{ mb: 2 }}
        >
          {banks
            .filter((b) => b._id !== bankId)
            .map((bank) => (
              <MenuItem key={bank._id} value={bank._id}>
                {bank.bankName}
              </MenuItem>
            ))}
        </TextField>

        {/* Amount */}
        <Typography
          variant="body2"
          color="text.secondary"
          mb={0.5}
          sx={{ fontStyle: "italic" }}
        >
          Available: {amountAvailable}
        </Typography>

        <TextField
          fullWidth
          label="Amount"
          size="small"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          sx={{ mb: error || successMsg ? 1 : 2 }}
          error={Boolean(error)}
        />

        {error && (
          <Alert severity="error" sx={{ mb: 2, fontSize: "0.85rem" }}>
            {error}
          </Alert>
        )}

        {successMsg && (
          <Alert severity="success" sx={{ mb: 2, fontSize: "0.85rem" }}>
            {successMsg}
          </Alert>
        )}

        {/* Note */}
        <TextField
          fullWidth
          label="Note (optional)"
          size="small"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          sx={{ mb: 3 }}
        />

        {/* Buttons */}
        <Box display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            onClick={onClose}
            disabled={loading}
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleTransfer}
            disabled={isDisabled}
            sx={{
              bgcolor: "#5A3E9E",
              color: "white",
              textTransform: "none",
              "&:hover": { bgcolor: "#472d88" },
              opacity: isDisabled ? 0.6 : 1,
            }}
          >
            {loading ? (
              <CircularProgress size={22} sx={{ color: "white" }} />
            ) : (
              "Confirm Transfer"
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default TransferMoney;
