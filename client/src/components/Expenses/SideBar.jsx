import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

// Lucide-react icons
import {
  LayoutDashboard,
  CreditCard,
  History,
  Archive,
  BarChart3,
  LogOut,
  ArrowLeft,
} from "lucide-react";

function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuItems = [
    { label: "Dashboard", path: "/expense", icon: <LayoutDashboard size={20} /> },
    { label: "Add Expense", path: "/expense/add", icon: <CreditCard size={20} /> },
    {
      label: "Expense History",
      path: "/expense/history",
      icon: <History size={20} />,
    },
    {
      label: "Manage Categories",
      path: "/expense/categories",
      icon: <Archive size={20} />,
    },
    { label: "Reports", path: "/expense/reports", icon: <BarChart3 size={20} /> },
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
      {/* Back button + Logo / Title */}
      <Box display="flex" alignItems="center" mb={4}>
        <IconButton
          onClick={() => navigate("/")}
          sx={{ color: "#654ea3", mr: 1 }}
        >
          <ArrowLeft size={20} />
        </IconButton>
        <Typography variant="h6" fontWeight="bold" color="#654ea3">
          Expense Manager
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
                  backgroundColor: isActive ? "#654ea3" : "transparent",
                  color: isActive ? "#FFFFFF" : "#5F5F5F",
                  "&:hover": {
                    backgroundColor: isActive ? "#654ea3" : "#f0e1f8",
                    color: isActive ? "#FFFFFF" : "#5A3E9E",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? "#FFFFFF" : "#654ea3",
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
