import React from "react";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import { Delete, Visibility, FilterList } from "@mui/icons-material";

function NewPayments() {
  const dummyData = [
    {
      date: "2025-08-13",
      OwnerName: "John Doe",
      vehicleNumber: "KL-07-AB-1234",
      InsuranceType: "Comprehensive",
      Amount: "₹15,000",
    },
    {
      date: "2025-08-12",
      OwnerName: "Jane Smith",
      vehicleNumber: "KL-11-CD-5678",
      InsuranceType: "Third Party",
      Amount: "₹5,000",
    },
    {
      date: "2025-08-11",
      OwnerName: "Ali Khan",
      vehicleNumber: "KL-21-EF-9101",
      InsuranceType: "Comprehensive",
      Amount: "₹12,000",
    },
  ];

  return (
    <Box>
      {/* Top Bar */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        p={2}
        sx={{
          background: "#f5f5f5",
          borderRadius: "8px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        {/* Search Field */}
        <TextField
          size="small"
          variant="outlined"
          placeholder="Search..."
          sx={{
            background: "white",
            borderRadius: "5px",
            width: "250px",
          }}
        />

        {/* Filter + Add Button */}
        <Box display="flex" gap={1}>
          <Button
            startIcon={<FilterList />}
            sx={{
              background: "#2196F3",
              color: "white",
              "&:hover": { background: "#1976D2" },
            }}
          >
            Filter
          </Button>
          <Button
            sx={{
              background: "#4CAF50",
              color: "white",
              "&:hover": { background: "#45a049" },
            }}
          >
            Add New Payment
          </Button>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: "8px" }}>
        <Table>
          <TableHead sx={{ background: "#2196F3" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>#</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Owner Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Vehicle Number</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Insurance Type</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Amount</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData.map((row, index) => (
              <TableRow key={index} hover>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.OwnerName}</TableCell>
                <TableCell>{row.vehicleNumber}</TableCell>
                <TableCell>{row.InsuranceType}</TableCell>
                <TableCell>{row.Amount}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <Visibility />
                  </IconButton> 
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default NewPayments;
