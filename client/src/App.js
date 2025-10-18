import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Login from "./components/Insurance/Login";
import InsuranceRouter from "./routes/InsuranceRouter";
import Home from "./components/Home";
import ExpenseRouter from "./routes/ExpenseRouter";
import KuriRouter from "./routes/KuriRouter";

function App() {
  // Axios setup
  axios.defaults.baseURL = "http://localhost:5000/";
  axios.defaults.withCredentials = true;

  const { user, refresh } = useSelector((state) => state);
  const dispatch = useDispatch();

  // Check authentication on app load / refresh
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
        dispatch({ type: "user", payload: { login: false, details: null } });
      }
    })();
  }, [refresh, dispatch]);

  return (
      <Box>
        <Routes>
          {/* Public route */}
          {!user.login && <Route path="*" element={<Login />} />}

          {/* Protected routes */}
          {user.login && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Navigate to="/" replace />} />
              <Route path="/insurance/*" element={<InsuranceRouter />} />
              <Route path="/expense/*" element={<ExpenseRouter/>}/>
              <Route path="/kuri/*" element={<KuriRouter/>}/>
            </>
          )}
        </Routes>
      </Box>
  );
}

export default App;
