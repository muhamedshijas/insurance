import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/Expenses/SideBar";
import { Route, Routes, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import axios from "axios";
import Dashboard from "../components/Expenses/Dashboard";
import BankManagement from "../components/Expenses/BankManagement";
import ExpenseManagement from "../components/Expenses/ExpenseManagement";
import ViewBankPage from "../components/Expenses/ViewBank";

function ExpenseRouter() {
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
    <Box display="flex" minHeight="100vh">
      {/* Sidebar */}
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
        sx={{
          ml: user.login ? `${sidebarWidth}px` : 0, // push content to the right of sidebar
          width: user.login ? `calc(100% - ${sidebarWidth}px)` : "100%",
          minHeight: "100vh",
        }}
      >
        <Routes>
          {!user.login ? (
            <Route path="*" element={<Navigate to="/login" replace />} />
          ) : (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<ExpenseManagement />} />
              <Route path="/bank" element={<BankManagement />} />
              <Route path ="/bank/:id" element={<ViewBankPage/>}/>
            </>
          )}
        </Routes>
      </Box>
    </Box>
  );
}

export default ExpenseRouter;
