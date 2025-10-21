import { Box, Button, TextField, Typography } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import React, { useState } from "react";
import axios from "axios";

function AddBank({ show, setShow }) {
  const [bankName, setBankName] = useState("");
  const [err, setErr] = useState("");
  const [accNo, setAccNo] = useState();
  const [amountAvailable, setAmountAvailable] = useState();
  const handleShow = () => {
    setShow(!show);
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    console.log("hiii");
    
    const { data } = await axios.post("/acc/add-acc", {
      bankName,
      accNo,
      amountAvailable,
    });
    console.log(data);

    if (data.success) {
      setShow(!show);
    } else {
      setErr(data.message);
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
          <Typography variant="h6" gutterBottom color="#5A3E9E">
            Add banks
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
          label="Bank Name"
          name="Bank Name "
          value={bankName}
          onChange={(e) => {
            setBankName(e.target.value);
          }}
          fullWidth
        />

        <TextField
          style={{ marginTop: "10px" }}
          label="Account Number"
          name="Account Number"
          value={accNo}
          onChange={(e) => {
            setAccNo(e.target.value);
          }}
          fullWidth
        />
        <TextField
          style={{ marginTop: "10px" }}
          label="Amount Available"
          name="Amount Available"
          value={amountAvailable}
          onChange={(e) => {
            setAmountAvailable(e.target.value);
          }}
          fullWidth
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          style={{ marginTop: "10px", background: "#5A3E9E", color: "white" }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default AddBank;
