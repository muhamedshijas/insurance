import {
  Box,
  TextField,
  Typography,
  MenuItem,
  Button,
  Alert,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

function AddTransactions({ show, setShow, refresh, setRefresh }) {
  const [bank, setBank] = useState("");
  const [banks, setBanks] = useState([]);
  const [category, setCategory] = useState(""); // "Income" or "Expense"
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [amountAvailable, setAmountAvailable] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch banks
  useEffect(() => {
    (async function fetchBanks() {
      try {
        const { data } = await axios.get("/acc/get-acc");
        if (!data.err) setBanks(data.banks);
      } catch (err) {
        console.error(err);
        setError("Failed to load bank list.");
      }
    })();
  }, []);

  // Handle bank change
  const handleBankChange = (e) => {
    const selectedBankId = e.target.value;
    setBank(selectedBankId);
    const selectedBank = banks.find((b) => b._id === selectedBankId);
    if (selectedBank) {
      setAmountAvailable(selectedBank.amountAvailable || 0);
    } else {
      setAmountAvailable("");
    }
  };

  // Handle category change (Income/Expense)
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setError(""); // clear error on mode change
  };

  // Real-time amount validation
  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);

    if (category === "Expense" && Number(value) > Number(amountAvailable)) {
      setError("Entered amount exceeds available balance.");
    } else if (Number(value) <= 0) {
      setError("Amount must be greater than zero.");
    } else {
      setError("");
    }
  };

  // Check if form is valid
  const isFormValid =
    bank &&
    category &&
    description.trim() &&
    amount &&
    !error &&
    Number(amount) > 0;
  const handleModal = () => {
    setShow(!show);
  };
  // Submit transaction
  const handleSubmit = async () => {
    try {
      const { data } = await axios.post("/acc/transaction/add-transaction", {
        bankId: bank,
        category,
        description,
        amount: Number(amount),
      });

      if (data.success) {
        setSuccess("Transaction added successfully!");
        setError("");
        setBank("");
        setCategory("");
        setDescription("");
        setAmount("");
        setAmountAvailable("");
        setTimeout(() => setSuccess(""), 3000);
        setRefresh(!refresh);
        setShow(!show);
      } else {
        setError(data.message || "Failed to add transaction.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while adding transaction.");
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      position="fixed"
      left="0"
      top="0"
      bgcolor="rgba(5, 5, 5, 0.15)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex={999}
    >
      <Box
        bgcolor="white"
        p={4}
        borderRadius="16px"
        boxShadow="0 0 20px rgba(0,0,0,0.15)"
        width="450px"
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          color="#5A3E9E"
          mb={3}
          textAlign="center"
        >
          Add Transaction
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        {/* Bank Select */}
        <TextField
          select
          label="Select Bank"
          fullWidth
          size="small"
          value={bank}
          onChange={handleBankChange}
          sx={{ mb: 2 }}
        >
          {banks.map((b) => (
            <MenuItem key={b._id} value={b._id}>
              {b.bankName}
            </MenuItem>
          ))}
        </TextField>

        {/* Display available amount */}
        {amountAvailable !== "" && (
          <Typography
            variant="body2"
            sx={{
              mb: 2,
              fontWeight: 500,
              color: "#5A3E9E",
              textAlign: "right",
            }}
          >
            💰 Available: ₹{amountAvailable}
          </Typography>
        )}

        {/* Category */}
        <TextField
          select
          label="Transaction Category"
          fullWidth
          size="small"
          value={category}
          onChange={handleCategoryChange}
          sx={{ mb: 2 }}
        >
          <MenuItem value="Income">Income</MenuItem>
          <MenuItem value="Expense">Expense</MenuItem>
        </TextField>

        {/* Amount */}
        <TextField
          label="Amount"
          fullWidth
          size="small"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          error={Boolean(error)}
          helperText={
            category === "Expense" && Number(amount) > Number(amountAvailable)
              ? "⚠️ Amount exceeds available balance"
              : ""
          }
          sx={{ mb: 2 }}
        />

        {/* Description */}
        <TextField
          label="Description"
          fullWidth
          size="small"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 3 }}
        />

        {/* Submit */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Button
            variant="contained"
            fullWidth
            disabled={!isFormValid}
            onClick={handleSubmit}
            sx={{
              backgroundColor: isFormValid ? "#5A3E9E" : "#C9C3E6",
              "&:hover": {
                backgroundColor: isFormValid ? "#4B2E8A" : "#C9C3E6",
              },
              color: "white",
              py: 1,
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Submit Transaction
          </Button>
          <Button
            variant="outlined"
            onClick={handleModal}
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default AddTransactions;
