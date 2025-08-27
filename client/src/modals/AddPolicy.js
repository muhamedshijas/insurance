import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { CloseRounded } from "@mui/icons-material";

function AddPolicy({ show, setShow }) {
  const [policyName, setPolicyName] = useState("");
  const [err, setErr] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/catlog/add-policy", {
        policy: policyName,
      });

      if (data.success) {
        alert("Policy added successfully");
        setShow(false);
      } else {
        setErr(data.message || "Something went wrong");
      }
    } catch (error) {
      if (error.response) {
        // server responded with 400, 500, etc.
        setErr(error.response.data.message || "Request failed");
      } else if (error.request) {
        // no response from server
        setErr("No response from server");
      } else {
        // something else
        setErr("Error: " + error.message);
      }
    }
  };
  const handleShow = () => {
    setShow(!show);
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
            Add Policy
          </Typography>
          <Button onClick={handleShow}>
            <CloseRounded color="error" />{" "}
          </Button>
        </Box>
        {err && (
          <Typography variant="overline" color="red">
            {err}
          </Typography>
        )}
        <TextField
          style={{ marginTop: "10px" }}
          label="Policy Title"
          name="Policy Title "
          value={policyName}
          fullWidth
          onChange={(e) => setPolicyName(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          style={{ marginTop: "10px", background: "#4CAF50", color: "white" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default AddPolicy;
