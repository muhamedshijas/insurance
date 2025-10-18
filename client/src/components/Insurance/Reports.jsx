import React, { useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";

// Icons
import AssignmentIcon from "@mui/icons-material/Assignment";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/HourglassEmpty";
import PaymentIcon from "@mui/icons-material/Payment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const MotionCard = motion(Card);

export default function Reports() {
  const [month, setMonth] = useState("All");
  const [loading, setLoading] = useState(false);
  const [applicationSummary, setApplicationSummary] = useState({});
  const [paymentSummary, setPaymentSummary] = useState({});
  const [recents, setRecents] = useState([]);

  // Fetch reports dynamically from backend
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/reports/get-reports-by-month", {
          params: { month },
        });
        if (!data.err) {
          setApplicationSummary(data.applicationSummary || {});
          setPaymentSummary(data.paymentSummary || {});
          setRecents(data.recents || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [month]);

  // ✅ Convert backend object → frontend array with metadata
  const appSummaryArray = [
    {
      label: "Total Applications",
      value: applicationSummary.total || 0,
      icon: <AssignmentIcon />,
      color: "#2563eb",
    },
    {
      label: "Approved",
      value: applicationSummary.approved || 0,
      icon: <DoneAllIcon />,
      color: "#16a34a",
    },
    {
      label: "Pending",
      value: applicationSummary.pending || 0,
      icon: <PendingIcon />,
      color: "#f59e0b",
    },
    {
      label: "Rejected",
      value: applicationSummary.rejected || 0,
      icon: <CancelIcon />,
      color: "#dc2626",
    },
  ];

  const paymentSummaryArray = [
    {
      label: "Total Payments",
      value: `₹ ${paymentSummary.totalAmount || 0}`,
      icon: <PaymentIcon />,
      color: "#f59e0b",
    },
    {
      label: "Total Commission",
      value: `₹ ${paymentSummary.totalCommission || 0}`,
      icon: <MonetizationOnIcon />,
      color: "#9333ea",
    },
  ];

  return (
    <Box p={3}>
      {/* Header */}
      <Typography variant="h5" fontWeight="bold" gutterBottom color="#16a34a">
        Reports
      </Typography>

      {/* Filters */}
      <Box display="flex" gap={3} alignItems="center" mb={3}>
        <FormControl size="small">
          <InputLabel>Month</InputLabel>
          <Select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            label="Month"
          >
            <MenuItem value="All">All</MenuItem>
            {[...Array(12)].map((_, i) => (
              <MenuItem key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Application Summary */}
          <Typography variant="h6" gutterBottom color="#15803d">
            Application Summary
          </Typography>
          <Grid container spacing={3} mb={3}>
            {appSummaryArray.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <MotionCard
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  sx={{
                    height: 160,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: 3,
                    boxShadow: 3,
                    px: 2,
                  }}
                >
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {item.label}
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{ color: item.color }}
                    >
                      {item.value}
                    </Typography>
                  </CardContent>
                  <Box sx={{ fontSize: 40, color: item.color, mr: 2 }}>
                    {item.icon}
                  </Box>
                </MotionCard>
              </Grid>
            ))}
          </Grid>

          {/* Payment Summary */}
          <Typography variant="h6" gutterBottom color="#15803d">
            Payment Summary
          </Typography>
          <Grid container spacing={3} mb={3}>
            {paymentSummaryArray.map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <MotionCard
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  sx={{
                    height: 160,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: 3,
                    boxShadow: 3,
                    px: 2,
                  }}
                >
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {item.label}
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{ color: item.color }}
                    >
                      {item.value}
                    </Typography>
                  </CardContent>
                  <Box sx={{ fontSize: 40, color: item.color, mr: 2 }}>
                    {item.icon}
                  </Box>
                </MotionCard>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Recent Transactions */}
          <Typography variant="h6" gutterBottom color="#15803d">
            Recent Transactions
          </Typography>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#E8F5E9" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Owner Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Vehicle No</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recents.length > 0 ? (
                recents.map((t, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ borderBottom: "1px solid #E0E0E0" }}
                  >
                    <TableCell>
                      {new Date(t.date).toLocaleDateString("en-GB")}
                    </TableCell>
                    <TableCell>{t.customerName}</TableCell>
                    <TableCell>{t.vehicleNumber}</TableCell>
                    <TableCell>{t?.policyType?.name}</TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color:
                          t.status === "Approved"
                            ? "green"
                            : t.status === "Rejected"
                            ? "red"
                            : "orange",
                      }}
                    >
                      {t.status}
                    </TableCell>
                  </motion.tr>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </>
      )}
    </Box>
  );
}
