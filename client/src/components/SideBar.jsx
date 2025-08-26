import { Box, Button, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuItems = [
    { label: "Dashboard", path: "/" },
    { label: "New Payment", path: "/new-payment" },
    { label: "Payments History", path: "/payments-history" },
    { label: "Catlogs", path: "/catlog" },
    { label: "Reports", path: "/reports" },
  ];

  async function handleLogout() {
    try {
      await axios.get("/auth/logout");
      dispatch({
        type: "user",
        payload: { login: false, details: null },
      });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  return (
    <Box
      width="250px"
      height="95vh"
      bgcolor="#FFFFFF"
      borderRight="1px solid #E0E0E0"
      display="flex"
      flexDirection="column"
      p={2}
    >
      {/* Logo / Title */}
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={4}
        color="#4CAF50"
        textAlign="center"
      >
        Payment Tracker
      </Typography>

      {/* Navigation Links */}
      <Box flex={1}>
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Typography
              key={index}
              component={Link}
              to={item.path}
              variant="body1"
              sx={{
                p: 1.5,
                borderRadius: "6px",
                color: isActive ? "#FFFFFF" : "#5F5F5F",
                backgroundColor: isActive ? "#4CAF50" : "transparent",
                textDecoration: "none",
                display: "block",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: isActive ? "#45A049" : "#E8F5E9",
                  color: isActive ? "#FFFFFF" : "#388E3C",
                },
              }}
            >
              {item.label}
            </Typography>
          );
        })}
      </Box>

      {/* Logout Button */}
      <Button
        onClick={handleLogout}
        variant="contained"
        color="error"
        sx={{
          mt: "auto",
          textTransform: "none",
          fontWeight: "bold",
        }}
      >
        Logout
      </Button>
    </Box>
  );
}

export default SideBar;
