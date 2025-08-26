import { Box, Button, TextField, Typography } from "@mui/material";

import React, { useState } from "react";
import { CloseRounded } from "@mui/icons-material";

function AddPolicy({ show, setShow }) {
    const [policyName,setPolicyName]=useState("")
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
    
            <TextField
              style={{ marginTop: "10px" }}
              label="Policy Title"
              name="Policy Title "
              value={policyName}
              fullWidth
            />
            <Button
              variant="contained"
              fullWidth
              style={{ marginTop: "10px", background: "#4CAF50", color: "white" }}
            >
              Submit
            </Button>
          </Box>
        </Box>
  );
}

export default AddPolicy;
