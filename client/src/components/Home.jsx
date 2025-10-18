import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { RiMosqueLine } from "react-icons/ri";
import {
  AccountBalance,
  Payment,
  Receipt,
  Schedule,
} from "@mui/icons-material";

function Home() {
  const cards = [
    {
      title: "Insurance",
      color: "linear-gradient(135deg, #4CAF50, #069d59ff)",
      link: "/insurance/dashboard",
      icon: <AccountBalance sx={{ fontSize: 60, mb: 2 }} />,
    },
    {
      title: "Kuri (Masjid Expenses)",
      color: "linear-gradient(135deg, #1E88E5, #64B5F6)", // Updated to blue/cyan theme
      link: "/kuri",
      icon: <Payment sx={{ fontSize: 60, mb: 2 }} />,
    },
    {
      title: "Expense",
      color: "linear-gradient(135deg, #654ea3, #eaafc8)",
      link: "/expense",
      icon: <Receipt sx={{ fontSize: 60, mb: 2 }} />,
    },
    {
      title: "Coming Soon",
      color: "linear-gradient(135deg, #f7971e, #ffd200)",
      link: "#",
      icon: <Schedule sx={{ fontSize: 60, mb: 2 }} />,
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f0f2f5",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
        p: 3,
      }}
    >
      {cards.map((card, index) => (
        <Link
          key={index}
          to={card.link}
          style={{ textDecoration: "none", width: "45%" }}
        >
          <Box
            sx={{
              height: "320px",
              width: "100%",
              borderRadius: "20px",
              background: card.color,
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              fontWeight: "bold",
              boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-10px)",
                boxShadow: "0 10px 35px rgba(0,0,0,0.3)",
              },
            }}
          >
            {card.icon}
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              {card.title}
            </Typography>
          </Box>
        </Link>
      ))}
    </Box>
  );
}

export default Home;
