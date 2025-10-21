import {
  Box,
  Typography,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { CloseRounded } from "@mui/icons-material";
import TransferMoney from "./TranseferMoney";


function ViewBank({ showViewModal, setShowViewModal }) {
  const [transferOpen, setTransferOpen] = useState(false);

  const handleClose = () => {
    setShowViewModal(false);
  };

  const bank = {
    id: 1, // unique ID for backend
    bankName: "HDFC Bank",
    place: "Kochi, Kerala",
    ifscCode: "HDFC0001234",
    accNo: "1234 5678 9012",
    ownerName: "Muhamed Shijas",
    mobileNo: "+91 8086665118",
    latestTransactions: [
      { to: "Amazon", date: "2025-10-18", amount: "₹2,500" },
      { to: "Flipkart", date: "2025-10-15", amount: "₹1,200" },
      { to: "Netflix", date: "2025-10-10", amount: "₹499" },
    ],
  };

  const infoFields = [
    { label: "Bank Name", value: bank.bankName },
    { label: "Account Number", value: bank.accNo },
    { label: "IFSC Code", value: bank.ifscCode },
    { label: "Branch", value: bank.place },
    { label: "Owner", value: bank.ownerName },
    { label: "Mobile", value: bank.mobileNo },
  ];

  if (!showViewModal) return null;

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
      zIndex={1000}
    >
      <Box
        bgcolor="white"
        borderRadius="12px"
        boxShadow="0 0 15px rgba(0,0,0,0.3)"
        width="500px"
        maxHeight="90vh"
        overflow="auto"
        sx={{
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bgcolor="#5A3E9E"
          color="white"
          px={3}
          py={2}
          borderTopLeftRadius="12px"
          borderTopRightRadius="12px"
        >
          <Typography variant="h6" fontWeight="bold">
            Bank Details
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseRounded sx={{ color: "white" }} />
          </IconButton>
        </Box>

        {/* Body */}
        <Box p={3}>
          <Typography variant="h6" color="#5A3E9E" fontWeight="bold" mb={2}>
            Account Information
          </Typography>

          {infoFields.map((field, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              mb={1.5}
              sx={{ borderBottom: "1px solid #eee", pb: 1 }}
            >
              <Typography sx={{ width: "180px", fontWeight: "bold", color: "#333" }}>
                {field.label}:
              </Typography>
              <Typography sx={{ color: "#555" }}>{field.value}</Typography>
            </Box>
          ))}

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" color="#5A3E9E" fontWeight="bold" mb={2}>
            Latest Transactions
          </Typography>

          {bank.latestTransactions.map((tx, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bgcolor="#f5f3fc"
              p={1.5}
              mb={1}
              borderRadius="8px"
            >
              <Box>
                <Typography variant="body2">
                  <strong>To:</strong> {tx.to}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {tx.date}
                </Typography>
              </Box>
              <Typography variant="body2" fontWeight="bold" color="#5A3E9E">
                {tx.amount}
              </Typography>
            </Box>
          ))}

          <Divider sx={{ my: 3 }} />

          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "#5A3E9E",
              color: "white",
              py: 1.2,
              borderRadius: "6px",
              textTransform: "none",
              "&:hover": { bgcolor: "#462d82" },
            }}
            onClick={() => setTransferOpen(true)}
          >
            Transfer Money
          </Button>
        </Box>
      </Box>

      {/* Transfer Modal */}
      <TransferMoney
        open={transferOpen}
        onClose={() => setTransferOpen(false)}
        bankId={bank.id}
      />
    </Box>
  );
}

export default ViewBank;
