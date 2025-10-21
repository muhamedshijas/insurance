import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import React, { useState } from "react";
import axios from "axios";

function AddBank({ show, setShow, refresh, setRefresh }) {
  const [bankName, setBankName] = useState("");
  const [accNo, setAccNo] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [branch, setBranch] = useState("");
  const [branchAddress, setBranchAddress] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [accountType, setAccountType] = useState("Savings");
  const [accountInfo, setAccountInfo] = useState("Self");
  const [amountAvailable, setAmountAvailable] = useState("");

  const [err, setErr] = useState("");

  const handleShow = () => setShow(!show);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/acc/add-acc", {
        bankName,
        accNo,
        ifscCode,
        branch,
        branchAddress,
        ownerName,
        mobileNo,
        accountInfo,
        accountType,
        amountAvailable,
      });

      if (data.success) {
        setRefresh(!refresh)
        setShow(false);
      } else {
        setErr(data.message);
      }
    } catch (error) {
      setErr("Something went wrong. Please try again.");
    }
  };

  if (!show) return null;

  return (
    <Box
      width="100vw"
      height="100vh"
      position="fixed"
      left="0"
      top="0"
      bgcolor="rgba(0,0,0,0.25)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex={1000}
    >
      <Box
        bgcolor="white"
        p={4}
        borderRadius="16px"
        boxShadow="0 0 25px rgba(0,0,0,0.25)"
        width={{ xs: "95%", sm: "550px" }}
        maxHeight="90vh"
        overflow="auto"
      >
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5" color="#5A3E9E" fontWeight="bold">
            Add Bank Account
          </Typography>
          <IconButton onClick={handleShow}>
            <CloseRounded sx={{ color: "red" }} />
          </IconButton>
        </Box>

        {err && (
          <Typography variant="body2" color="error" mb={2}>
            {err}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          {/* Bank Info Section */}
          <Box mb={3}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="#5A3E9E"
              gutterBottom
            >
              Bank Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Bank Name"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  fullWidth
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Account Number"
                  value={accNo}
                  onChange={(e) => setAccNo(e.target.value)}
                  fullWidth
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="IFSC Code"
                  value={ifscCode}
                  onChange={(e) => setIfscCode(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Branch"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>

              {/* Branch Address - now full width and spacious */}
              <Grid item xs={12}>
                <TextField
                  label="Branch Address"
                  value={branchAddress}
                  onChange={(e) => setBranchAddress(e.target.value)}
                  sx={{ width: "475px" }}
                  multiline
                  rows={3}
                  size="small"
                />
              </Grid>
            </Grid>
          </Box>

          {/* Owner Info Section */}
          <Box mb={3}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="#5A3E9E"
              gutterBottom
            >
              Owner & Account Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Owner Name"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  fullWidth
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Mobile No."
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ width: "230px" }}
                  label="Account Type"
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                  size="small"
                  select
                  SelectProps={{ native: true }}
                >
                  <option value="Savings">Savings</option>
                  <option value="Current">Current</option>
                  <option value="Fixed Deposit">Fixed Deposit</option>
                  <option value="Recurring Deposit">Recurring Deposit</option>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ width: "230px" }}
                  label="Account Info"
                  value={accountInfo}
                  onChange={(e) => setAccountInfo(e.target.value)}
                  size="small"
                  select
                  SelectProps={{ native: true }}
                >
                  <option value="Self">Self</option>
                  <option value="Business">Business</option>
                  <option value="Others">Others</option>
                </TextField>
              </Grid>

              {/* Highlighted Amount Available */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Amount Available"
                  value={amountAvailable}
                  onChange={(e) => setAmountAvailable(e.target.value)}
                  type="number"
                  size="small"
                  sx={{
                    width: "230px",
                    bgcolor: "rgba(90, 62, 158, 0.08)",
                    borderRadius: "8px",
                    "& .MuiInputLabel-root": {
                      fontWeight: "bold",
                      color: "red",
                    },
                    "& .MuiOutlinedInput-root": {
                      fontSize: "1rem",
                      fontWeight: "600",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 1,
              py: 1.5,
              bgcolor: "#5A3E9E",
              color: "white",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#462d82" },
            }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default AddBank;
