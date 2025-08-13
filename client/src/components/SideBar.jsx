import { Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import React from "react";

function SideBar() {
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", path: "/" },
    { label: "New Payment", path: "/new-payment" },
    { label: "Payments History", path: "/payments-history" },
    { label: "Reports", path: "/reports" },
    { label: "Settings", path: "/settings" },
  ];

  return (
    <Box
      width="250px"
      height="100vh"
      bgcolor="#FFFFFF"
      borderRight="1px solid #E0E0E0"
      display="flex"
      flexDirection="column"
      p={2}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={4}
        color="#4CAF50"
        textAlign="center"
      >
        Payment Tracker
      </Typography>

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
  );
}

export default SideBar;
