import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  FormControl,
  InputLabel,
} from "@mui/material";
import { motion } from "framer-motion";

// Icons
import AssignmentIcon from "@mui/icons-material/Assignment";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CancelIcon from "@mui/icons-material/Cancel";
import PaymentIcon from "@mui/icons-material/Payment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const MotionCard = motion(Card); 

export default function Reports() {
  const [month, setMonth] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const transactions = [
    { id: 1, date: "2025-08-01", type: "Application Fee", amount: 200 },
    { id: 2, date: "2025-08-05", type: "Commission", amount: 50 },
    { id: 3, date: "2025-08-12", type: "Application Fee", amount: 300 },
  ];

  const filteredTransactions =
    month === "All"
      ? transactions
      : transactions.filter((t) => new Date(t.date).getMonth() + 1 === Number(month));

  // Application summary data
  let appSummary = [
    { label: "Total Applications", value: 120, color: "#1976d2", icon: <AssignmentIcon /> },
    { label: "Approved", value: 90, color: "#45A049", icon: <DoneAllIcon /> },
    { label: "Rejected", value: 30, color: "#d32f2f", icon: <CancelIcon /> },
  ];

  // Apply sorting
  if (sortBy === "value") {
    appSummary = [...appSummary].sort((a, b) => b.value - a.value);
  } else if (sortBy === "name") {
    appSummary = [...appSummary].sort((a, b) => a.label.localeCompare(b.label));
  }

  // Payment summary
  const paymentSummary = [
    { label: "Total Payments", value: "₹ 25,000", color: "#0288d1", icon: <PaymentIcon /> },
    { label: "Total Commission", value: "₹ 5,000", color: "#f57c00", icon: <MonetizationOnIcon /> },
  ];

  return (
    <Box p={3}>
      {/* Header */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Reports
      </Typography>

      {/* Filters */}
      <Box display="flex" gap={3} alignItems="center" mb={3}>
        {/* Month Filter */}
        <FormControl size="small">
          <InputLabel>Month</InputLabel>
          <Select value={month} onChange={(e) => setMonth(e.target.value)} label="Month">
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="1">January</MenuItem>
            <MenuItem value="2">February</MenuItem>
            <MenuItem value="3">March</MenuItem>
            <MenuItem value="4">April</MenuItem>
            <MenuItem value="5">May</MenuItem>
            <MenuItem value="6">June</MenuItem>
            <MenuItem value="7">July</MenuItem>
            <MenuItem value="8">August</MenuItem>
            <MenuItem value="9">September</MenuItem>
            <MenuItem value="10">October</MenuItem>
            <MenuItem value="11">November</MenuItem>
            <MenuItem value="12">December</MenuItem>
          </Select>
        </FormControl>

        {/* Sorting Filter */}
        <FormControl size="small">
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} label="Sort By">
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="value">By Value</MenuItem>
            <MenuItem value="name">By Name</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Application Summary */}
      <Typography variant="h6" gutterBottom>
        Application Summary
      </Typography>
      <Grid container spacing={2} mb={3}>
        {appSummary.map((item, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <MotionCard
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              sx={{ textAlign: "center", p: 2, backgroundColor: item.color, color: "white" }}
            >
              <CardContent>
                <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                  {item.icon}
                  <Typography variant="h6">{item.label}</Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {item.value}
                  </Typography>
                </Box>
              </CardContent>
            </MotionCard>
          </Grid>
        ))}
      </Grid>

      {/* Payment Summary */}
      <Typography variant="h6" gutterBottom>
        Payment Summary
      </Typography>
      <Grid container spacing={2} mb={3}>
        {paymentSummary.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <MotionCard
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              sx={{ textAlign: "center", p: 2, backgroundColor: item.color, color: "white" }}
            >
              <CardContent>
                <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                  {item.icon}
                  <Typography variant="h6">{item.label}</Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {item.value}
                  </Typography>
                </Box>
              </CardContent>
            </MotionCard>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Recent Transactions */}
      <Typography variant="h6" gutterBottom>
        Recent Transactions
      </Typography>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTransactions.map((t) => (
            <motion.tr
              key={t.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <TableCell>{t.date}</TableCell>
              <TableCell>{t.type}</TableCell>
              <TableCell align="right">₹ {t.amount}</TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
