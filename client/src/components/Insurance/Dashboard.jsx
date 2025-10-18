// Dashboard.jsx
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import {
  AssignmentTurnedIn,
  PendingActions,
  CheckCircle,
  Payment,
  MonetizationOn,
} from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import axios from "axios";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Animation variant
const cardVariant = {
  hidden: { y: -40, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.2 },
  }),
};

function Dashboard() {
  const [applicationSummary, setApplicationSummary] = useState({});
  const [paymentSummary, setPaymentSummary] = useState({});
  const [monthlyData, setMonthlyData] = useState([]);
  const [companiesCount, setCompaniesCount] = useState([]);
  const [policiesCount, setPoliciesCount] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/reports/get-dashboard");
        if (!data.err) {
          setApplicationSummary(data.applicationSummary);
          setPaymentSummary(data.paymentSummary);
          setCompaniesCount(data.companiesCount);
          setPoliciesCount(data.policiesCount);
          setMonthlyData(data.monthlyData);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <Box p={3}>
      {/* Applications Section */}
      <Typography variant="h6" mb={2} fontWeight="bold">
        Applications Summary
      </Typography>

      <Grid container spacing={3}>
        {[
          {
            title: "Total Applications",
            value: applicationSummary.total,
            color: "primary.main",
            icon: (
              <AssignmentTurnedIn
                sx={{ fontSize: 40, color: "primary.main" }}
              />
            ),
          },
          {
            title: "Pending",
            value: applicationSummary.pending,
            color: "warning.main",
            icon: (
              <PendingActions sx={{ fontSize: 40, color: "warning.main" }} />
            ),
          },
          {
            title: "Approved",
            value: applicationSummary.approved,
            color: "success.main",
            icon: <CheckCircle sx={{ fontSize: 40, color: "success.main" }} />,
          },
          {
            title: "Rejected",
            value: applicationSummary.rejected,
            color: "error.main",
            icon: <CancelIcon sx={{ fontSize: 40, color: "error.main" }} />,
          },
        ].map((item, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <motion.div
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              custom={i}
            >
              <Card
                sx={{
                  p: 2,
                  borderRadius: 3,
                  boxShadow: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {item.title}
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" color={item.color}>
                    {item.value}
                  </Typography>
                </CardContent>
                {item.icon}
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Payments Section */}
      <Typography variant="h6" mt={5} mb={2} fontWeight="bold">
        Payments Summary
      </Typography>
      <Grid container spacing={3}>
        {[
          {
            title: "Total Payment",
            value: paymentSummary.totalAmount,
            color: "primary.main",
            icon: <Payment sx={{ fontSize: 40, color: "primary.main" }} />,
          },
          {
            title: "Total Commission",
            value: paymentSummary.totalCommission,
            color: "secondary.main",
            icon: (
              <MonetizationOn sx={{ fontSize: 40, color: "secondary.main" }} />
            ),
          },
        ].map((item, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <motion.div
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              custom={i}
            >
              <Card
                sx={{
                  p: 2,
                  borderRadius: 3,
                  boxShadow: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {item.title}
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" color={item.color}>
                    {item.value}
                  </Typography>
                </CardContent>
                {item.icon}
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Distribution Section  */}
      <Typography variant="h6" mt={5} mb={2} fontWeight="bold">
        Distribution
      </Typography>

      <Grid container spacing={3} mt={1}>
        {/* Company Distribution Table */}
        <Grid item xs={12} md={6}>
          <motion.div
            variants={cardVariant}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            <Card sx={{ p: 1, borderRadius: 3, boxShadow: 3, width: "600px" }}>
              <TableContainer>
                <Table sx={{ width: "100%" }}>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#4CAF50" }}>
                      <TableCell
                        sx={{
                          color: "#FFFFFF",
                          fontWeight: "bold",
                          borderTopLeftRadius: "6px",
                        }}
                      >
                        Company
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color: "#ffffff",
                          borderTopRightRadius: "6px",
                        }}
                      >
                        <b>Count</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {companiesCount.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell>{row.companyName}</TableCell>
                        <TableCell align="right">{row.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>

                  <caption
                    style={{
                      captionSide: "block-end",
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                    }}
                  >
                    Company Count Summary
                  </caption>
                </Table>
              </TableContainer>
            </Card>
          </motion.div>
        </Grid>

        {/* Policy Distribution Table */}
        <Grid item xs={12} md={6}>
          <motion.div
            variants={cardVariant}
            initial="hidden"
            animate="visible"
            custom={5}
          >
            <Card sx={{ p: 1, borderRadius: 3, boxShadow: 3, width: "400px" }}>
              <TableContainer>
                <Table size="medium">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#4CAF50" }}>
                      <TableCell
                        sx={{
                          color: "#FFFFFF",
                          fontWeight: "bold",
                          borderTopLeftRadius: "6px",
                        }}
                      >
                        Policy
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color: "#ffffff",
                          borderTopRightRadius: "6px",
                        }}
                      >
                        <b>Count</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {policiesCount.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell>{row.policyName}</TableCell>
                        <TableCell align="right">{row.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <caption
                    style={{
                      captionSide: "block-end",
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                    }}
                  >
                    Policy Count Summary
                  </caption>
                </Table>
              </TableContainer>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
      {/* Charts Section */}
      <Typography variant="h6" mt={5} mb={2} fontWeight="bold">
        Analytics
      </Typography>

      {/* Monthly Bar Chart */}
      <motion.div
        variants={cardVariant}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, mb: 3 }}>
          <Typography variant="body2" mb={2}>
            Monthly Collection Overview
          </Typography>
          <BarChart width={1100} height={350} data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="collection" fill="#8884d8" name="Collection (₹)" />
            <Bar dataKey="commission" fill="#82ca9d" name="Commission (₹)" />
          </BarChart>
        </Card>
      </motion.div>

      <Grid container spacing={3} mt={2}>
        {/* Company Pie */}
        <Grid item xs={12} md={6}>
          <motion.div
            variants={cardVariant}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
              <Typography variant="body2" mb={2}>
                Company Distribution
              </Typography>
              <PieChart width={350} height={250}>
                <Pie
                  data={companiesCount.map((c) => ({
                    name: c.companyName,
                    value: c.count,
                  }))}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                >
                  {companiesCount.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Card>
          </motion.div>
        </Grid>

        {/* Policy Pie */}
        <Grid item xs={12} md={6}>
          <motion.div
            variants={cardVariant}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
              <Typography variant="body2" mb={2}>
                Policy Type Overview
              </Typography>
              <PieChart width={350} height={250}>
                <Pie
                  data={policiesCount.map((p) => ({
                    name: p.policyName,
                    value: p.count,
                  }))}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                >
                  {policiesCount.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
