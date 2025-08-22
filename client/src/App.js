import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Box } from "@mui/material";
import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import PaymentHistory from "./components/PaymentHistory";
import Reports from "./components/Reports";
import NewPayments from "./components/NewPayments";

function App() {
  axios.defaults.baseURL = "http://localhost:5000/";
  axios.defaults.withCredentials = true;

  const sidebarWidth = 240; // adjust as per your design

  return (
    <Box display="flex">
      {/* Fixed Sidebar */}
      <Box
        sx={{
          width: sidebarWidth,
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          bgcolor: "white",
          boxShadow: 2,
          zIndex: 1000,
        }}
      >
        <SideBar />
      </Box>

      {/* Main Content */}
      <Box
        flex={1}
        p={3}
        bgcolor="#FAFAFA"
        minHeight="100vh"
        sx={{ ml: `${sidebarWidth}px` }} // margin-left so content doesn't overlap
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/new-payment" element={<NewPayments />} />
          <Route path="/payments-history" element={<PaymentHistory />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
