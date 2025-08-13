import React, { useState } from "react";
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
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination,
} from "@mui/material";

function PaymentHistory() {
  const dummyData = [
    { date: "2025-08-13", OwnerName: "John Doe", vehicleNumber: "KL-07-AB-1234", InsuranceType: "Comprehensive", Amount: "₹12,000" },
    { date: "2025-07-15", OwnerName: "Akhil Kumar", vehicleNumber: "KL-05-CD-5678", InsuranceType: "Third Party", Amount: "₹7,500" },
    { date: "2025-08-10", OwnerName: "Priya Menon", vehicleNumber: "KL-11-EF-4321", InsuranceType: "Comprehensive", Amount: "₹10,000" },
    { date: "2025-06-25", OwnerName: "Vishnu Nair", vehicleNumber: "KL-22-GH-9876", InsuranceType: "Third Party", Amount: "₹8,200" },
    { date: "2025-08-05", OwnerName: "Anu Thomas", vehicleNumber: "KL-10-IJ-6543", InsuranceType: "Comprehensive", Amount: "₹9,500" },
    { date: "2025-05-18", OwnerName: "Rahul Raj", vehicleNumber: "KL-08-KL-3210", InsuranceType: "Third Party", Amount: "₹6,800" },
    { date: "2025-08-01", OwnerName: "Deepa S", vehicleNumber: "KL-02-MN-2468", InsuranceType: "Comprehensive", Amount: "₹11,000" },
    { date: "2025-04-12", OwnerName: "Ajay Kumar", vehicleNumber: "KL-15-OP-1357", InsuranceType: "Third Party", Amount: "₹7,300" },
    { date: "2025-08-14", OwnerName: "Rohit Sharma", vehicleNumber: "KL-03-QR-8642", InsuranceType: "Comprehensive", Amount: "₹13,000" },
    { date: "2025-03-20", OwnerName: "Meera P", vehicleNumber: "KL-14-ST-9753", InsuranceType: "Third Party", Amount: "₹6,500" },
    { date: "2025-08-11", OwnerName: "Arjun R", vehicleNumber: "KL-18-UV-5432", InsuranceType: "Comprehensive", Amount: "₹12,200" },
  ];

  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("");
  const [type, setType] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;

  // Filter, Search, and Sort Logic
  const filteredData = dummyData
    .filter((row) =>
      row.OwnerName.toLowerCase().includes(search.toLowerCase()) ||
      row.vehicleNumber.toLowerCase().includes(search.toLowerCase())
    )
    .filter((row) => (month ? row.date.split("-")[1] === month : true))
    .filter((row) => (type ? row.InsuranceType === type : true))
    .sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    );

  const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box p={3}>
      {/* Heading */}
      <Typography variant="h5" fontWeight="bold" color="#333" mb={3}>
        Payment History
      </Typography>

      {/* Filters & Search */}
      <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
        <TextField
          label="Search by Name or Vehicle No."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
        />

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Month</InputLabel>
          <Select value={month} onChange={(e) => setMonth(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="01">January</MenuItem>
            <MenuItem value="02">February</MenuItem>
            <MenuItem value="03">March</MenuItem>
            <MenuItem value="04">April</MenuItem>
            <MenuItem value="05">May</MenuItem>
            <MenuItem value="06">June</MenuItem>
            <MenuItem value="07">July</MenuItem>
            <MenuItem value="08">August</MenuItem>
            <MenuItem value="09">September</MenuItem>
            <MenuItem value="10">October</MenuItem>
            <MenuItem value="11">November</MenuItem>
            <MenuItem value="12">December</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Insurance Type</InputLabel>
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Comprehensive">Comprehensive</MenuItem>
            <MenuItem value="Third Party">Third Party</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Sort by Date</InputLabel>
          <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: "8px" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#E8F5E9" }}>
              <TableCell sx={{ fontWeight: "bold", color: "#2E7D32" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#2E7D32" }}>Owner Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#2E7D32" }}>Vehicle Number</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#2E7D32" }}>Insurance Type</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#2E7D32" }}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
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

      {/* Pagination */}
      <Box mt={3} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(filteredData.length / rowsPerPage)}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="success"
        />
      </Box>
    </Box>
  );
}

export default PaymentHistory;
