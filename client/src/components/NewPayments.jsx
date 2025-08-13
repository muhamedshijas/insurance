import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

function NewPayments() {
  const dummyData = [
    {
      date: "2025-08-13",
      OwnerName: "John Doe",
      vehicleNumber: "KL-07-AB-1234",
      InsuranceType: "Comprehensive",
      Amount: "₹12,000",
    },
    {
      date: "2025-08-12",
      OwnerName: "Akhil Kumar",
      vehicleNumber: "KL-05-CD-5678",
      InsuranceType: "Third Party",
      Amount: "₹7,500",
    },
    {
      date: "2025-08-13",
      OwnerName: "John Doe",
      vehicleNumber: "KL-07-AB-1234",
      InsuranceType: "Comprehensive",
      Amount: "₹12,000",
    },
    {
      date: "2025-08-12",
      OwnerName: "Akhil Kumar",
      vehicleNumber: "KL-05-CD-5678",
      InsuranceType: "Third Party",
      Amount: "₹7,500",
    },
    {
      date: "2025-08-13",
      OwnerName: "John Doe",
      vehicleNumber: "KL-07-AB-1234",
      InsuranceType: "Comprehensive",
      Amount: "₹12,000",
    },
    {
      date: "2025-08-12",
      OwnerName: "Akhil Kumar",
      vehicleNumber: "KL-05-CD-5678",
      InsuranceType: "Third Party",
      Amount: "₹7,500",
    },
    {
      date: "2025-08-13",
      OwnerName: "John Doe",
      vehicleNumber: "KL-07-AB-1234",
      InsuranceType: "Comprehensive",
      Amount: "₹12,000",
    },
    {
      date: "2025-08-12",
      OwnerName: "Akhil Kumar",
      vehicleNumber: "KL-05-CD-5678",
      InsuranceType: "Third Party",
      Amount: "₹7,500",
    },
  ];

  return (
    <Box p={3}>
      {/* Header Section */}
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" fontWeight="bold" color="#333">
          Latest Payments
        </Typography>
        <Button
          sx={{
            background: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            fontWeight: 500,
            borderRadius: "5px",
            "&:hover": {
              background: "#43A047",
            },
          }}
        >
          Add New Payment
        </Button>
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{ boxShadow: 3, borderRadius: "8px" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#E8F5E9" }}>
              <TableCell sx={{ fontWeight: "bold", color: "#2E7D32" }}>
                Date
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#2E7D32" }}>
                Owner Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#2E7D32" }}>
                Vehicle Number
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#2E7D32" }}>
                Insurance Type
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#2E7D32" }}>
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F1F8E9",
                  "&:hover": { backgroundColor: "#DCEDC8" },
                }}
              >
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.OwnerName}</TableCell>
                <TableCell>{row.vehicleNumber}</TableCell>
                <TableCell>{row.InsuranceType}</TableCell>
                <TableCell>{row.Amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default NewPayments;
