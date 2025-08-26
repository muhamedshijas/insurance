import { Box, Button, TextField, Typography } from "@mui/material";

import React, { useState } from "react";
import { CloseRounded } from "@mui/icons-material";
import axios from "axios";

function AddCompany({ show, setShow }) {
  const [companyName, setCompanyName] = useState("");
  const [err, setErr] = useState("");
  const handleShow = () => {
    setShow(!show);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/catlog/add-company", { companyName });
    if (data.success) {
      alert("Company added Successfully");
      setShow(!show);
    } else {
      setErr(data.err);
    }
  };
  return (
    <Box
      width="100vw"
      height="100vh"
      position="fixed"
      left="0px"
      top="0px"
      bgcolor="rgba(5, 5, 5, 0.141)"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        bgcolor="white"
        p={4}
        borderRadius="6px"
        boxShadow="0 0 10px rgba(0,0,0,0.3)"
        width="500px"
      >
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" gutterBottom color="#2e7d32">
            Add Company
          </Typography>
          <Button onClick={handleShow}>
            <CloseRounded color="error" />{" "}
          </Button>
        </Box>
        {err && (
          <Typography variant="caption" color="red">
            {err}
          </Typography>
        )}
        <TextField
          style={{ marginTop: "10px" }}
          label="Company Name"
          name="company Name "
          value={companyName}
          onChange={(e) => {
            setCompanyName(e.target.value);
          }}
          fullWidth
        />
        <Button
          variant="contained" 
          fullWidth
          onClick={handleSubmit}
          style={{ marginTop: "10px", background: "#4CAF50", color: "white" }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default AddCompany;
