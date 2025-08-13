import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Box, Button } from "@mui/material";
import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import PaymentHistory from "./components/PaymentHistory";
import Reports from "./components/Reports";
import NewPayments from "./components/NewPayments";

function App() {
  axios.defaults.baseURL = "http://localhost:5000/";
  axios.defaults.withCredentials = true;
  
  return (
    <Box display="flex">
      {/* Sidebar - stays on all pages */}
      <SideBar />

      {/* Main content area */}
      <Box flex={1} p={3} bgcolor="#FAFAFA" minHeight="100vh">
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
