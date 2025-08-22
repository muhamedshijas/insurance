// Dashboard.jsx
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
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
import React from "react";

const companyData = [
  { name: "GODIGIT", value: 10 },
  { name: "NEW INDIA", value: 4 },
  { name: "IFFCO", value: 3 },
];

const policyTypeData = [
  { name: "TP", value: 8 },
  { name: "PKG", value: 7 },
  { name: "Standalone", value: 1 },
];

const monthlyData = [
  { month: "Jan", collection: 10000, commission: 2000 },
  { month: "Feb", collection: 12000, commission: 2500 },
  { month: "Mar", collection: 8000, commission: 1500 },
  { month: "Apr", collection: 15000, commission: 3000 },
  { month: "May", collection: 18000, commission: 3500 },
  { month: "Jun", collection: 14000, commission: 2800 },
  { month: "Jul", collection: 20000, commission: 4000 },
  { month: "Aug", collection: 12100, commission: 3200 },
  { month: "Sep", collection: 18400, commission: 3800 },
  { month: "Oct", collection: 10000, commission: 3000 },
  { month: "Nov", collection: 15000, commission: 2400 },
  { month: "Dec", collection: 9000, commission: 900 },
];

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
            value: "23",
            color: "primary.main",
            icon: (
              <AssignmentTurnedIn
                sx={{ fontSize: 40, color: "primary.main" }}
              />
            ),
          },
          {
            title: "Pending",
            value: "15",
            color: "warning.main",
            icon: (
              <PendingActions sx={{ fontSize: 40, color: "warning.main" }} />
            ),
          },
          {
            title: "Approved",
            value: "5",
            color: "success.main",
            icon: <CheckCircle sx={{ fontSize: 40, color: "success.main" }} />,
          },
          {
            title: "Rejected",
            value: "5",
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
            value: "₹ 50,000",
            color: "primary.main",
            icon: <Payment sx={{ fontSize: 40, color: "primary.main" }} />,
          },
          {
            title: "Total Commission",
            value: "₹ 10,000",
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
                  data={companyData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                >
                  {companyData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
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
                  data={policyTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                >
                  {policyTypeData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
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
