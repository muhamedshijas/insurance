import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import PaymentHistory from "./components/PaymentHistory";
import Reports from "./components/Reports";
import NewPayments from "./components/NewPayments";
import Login from "./components/Login";

function App() {
  axios.defaults.baseURL = "http://localhost:5000/";
  axios.defaults.withCredentials = true;

  const { user, refresh } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      try {
        const { data: userData } = await axios.get("/auth/checkauth");
        dispatch({
          type: "user",
          payload: { login: userData.loggedIn, details: userData.user },
        });
      } catch (err) {
        console.error("Auth check failed:", err);
        dispatch({
          type: "user",
          payload: { login: false, details: null },
        });
      }
    })();
  }, [refresh, dispatch]);

  const sidebarWidth = 240;

  return (
    <Box display="flex">
      {/* Sidebar only when logged in */}
      {user.login && (
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
      )}

      {/* Main Content */}
      <Box
        flex={1}
        p={3}
        bgcolor="#FAFAFA"
        minHeight="100vh"
        sx={{ ml: user.login ? `${sidebarWidth}px` : 0 }}
      >
        <Routes>
          {!user.login ? (
            <>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              {/* Private Routes */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/new-payment" element={<NewPayments />} />
              <Route path="/payments-history" element={<PaymentHistory />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
