import { Box } from "@mui/material";
import React from "react";
import Home from "../components/Home";
import SideBar from "../components/SideBar";

function HomePage() {
  return (
    <Box>
      <SideBar />
      <Home />
    </Box>
  );
}

export default HomePage;
