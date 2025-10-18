import { Box, Button, Typography, List, ListItem, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

// Lucide-react icons
import {
  LayoutDashboard,
  CreditCard,
  History,
  Boxes,
  BarChart3,
  LogOut,
  ArrowLeft
} from "lucide-react";

function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuItems = [
    { label: "Dashboard", path: "/insurance", icon: <LayoutDashboard size={20} /> },
    { label: "New Payment", path: "/insurance/new-payment", icon: <CreditCard size={20} /> },
    { label: "Payments History", path: "/insurance/payments-history", icon: <History size={20} /> },
    { label: "Catlogs", path: "/insurance/catlog", icon: <Boxes size={20} /> },
    { label: "Reports", path: "/insurance/reports", icon: <BarChart3 size={20} /> },
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
     <Box display="flex" alignItems="center" mb={4}>
        <IconButton
          onClick={() => navigate("/")}
          sx={{ color: "#4CAF50", mr: 1 }}
        >
          <ArrowLeft size={20} />
        </IconButton>
        <Typography
          variant="h6"
          fontWeight="bold"
          color="#4CAF50"
        >
          Insurance Tracker
        </Typography>
      </Box>

      {/* Navigation Links */}
      <Box flex={1}>
        <List>
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem
                key={index}
                button
                component={Link}
                to={item.path}
                sx={{
                  mb: 1,
                  borderRadius: "6px",
                  backgroundColor: isActive ? "#4CAF50" : "transparent",
                  color: isActive ? "#FFFFFF" : "#5F5F5F",
                  "&:hover": {
                    backgroundColor: isActive ? "#45A049" : "#E8F5E9",
                    color: isActive ? "#FFFFFF" : "#388E3C",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? "#FFFFFF" : "#4CAF50",
                    minWidth: "40px",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            );
          })}
        </List>
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
          display: "flex",
          gap: 1,
          alignItems: "center",
        }}
      >
        <LogOut size={18} />
        Logout
      </Button>
    </Box>
  );
}

export default SideBar;
