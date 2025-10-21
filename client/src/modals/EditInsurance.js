import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function EditInsurance({ show, setShow, id, refresh, setRefresh }) {
  const [insurance, setInsurance] = useState({});
  const [status, setStatus] = useState("Pending");

  const handleClose = () => {
    setShow(false);
  };

  const handleSubmit = async () => {
    const { data } = await axios.post("/insurance/update-status", {
      id,
      status,
    });
    if (data.success) {
      alert("Insurance Updated Successfully");
      setRefresh(!refresh);
      setShow(!show);
    } else {
      alert("something Went Wrong");
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/insurance/get-insurancebyid/${id}`);
        if (!data.err) setInsurance(data.insurance);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  return (
    <Box
      width="100vw"
      height="100vh"
      position="fixed"
      left="0px"
      top="0px"
      bgcolor="rgba(5, 5, 5, 0.15)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex={1000}
    >
      <Box
        bgcolor="white"
        p={4}
        borderRadius="12px"
        boxShadow="0 0 15px rgba(0,0,0,0.3)"
        width="500px"
      >
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" fontWeight="bold" color="#2e7d32">
            Edit Insurance
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseRounded color="error" />
          </IconButton>
        </Box>

        {/* Form */}
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            name="owner"
            disabled
            fullWidth
            value={insurance.customerName}
          />
          <TextField
            name="vehicleNo"
            disabled
            fullWidth
            value={insurance.vehicleNumber}
          />

          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            sx={{
              bgcolor: "#2e7d32",
              "&:hover": { bgcolor: "#256628" },
              mt: 2,
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default EditInsurance;
