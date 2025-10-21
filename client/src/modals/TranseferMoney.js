import { Box, Typography, TextField, Button, Modal, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";

function TransferMoney({ open, onClose, bankId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRetry, setShowRetry] = useState(false);

  const fetchData = () => {
    setLoading(true);
    setShowRetry(false);
    axios
      .get(`/api/bank/${bankId}/transfer-info`)
      .then(res => setData(res.data))
      .catch(err => {
        console.error(err);
        setData(null);
      });
  };

  useEffect(() => {
    if (open && bankId) {
      fetchData();

      // 5-second loading
      const timer = setTimeout(() => {
        setLoading(false);
        if (!data) setShowRetry(true); // show reload + close if no data
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [open, bankId, data]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        bgcolor="white"
        borderRadius="12px"
        p={4}
        width="400px"
        sx={{ transform: "translate(-50%, -50%)" }}
      >
        <Typography variant="h6" fontWeight="bold" color="#5A3E9E" mb={3}>
          Transfer Money
        </Typography>

        {loading ? (
          <Box display="flex" flexDirection="column" alignItems="center" py={4}>
            <CircularProgress sx={{ mb: 2, color: "#5A3E9E" }} />
            <Typography color="#5A3E9E" fontWeight="bold">
              Loading transfer info...
            </Typography>
          </Box>
        ) : data ? (
          <>
            <TextField fullWidth label="Recipient Name" size="small" sx={{ mb: 2 }} />
            <TextField fullWidth label="Amount" size="small" sx={{ mb: 2 }} />
            <TextField fullWidth label="Note (optional)" size="small" sx={{ mb: 3 }} />

            <Box display="flex" justifyContent="space-between">
              <Button variant="outlined" onClick={onClose} sx={{ textTransform: "none" }}>
                Cancel
              </Button>
              <Button variant="contained" sx={{ bgcolor: "#5A3E9E", color: "white" }}>
                Confirm Transfer
              </Button>
            </Box>
          </>
        ) : (
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography color="error" mb={2}>
              Failed to load data.
            </Typography>
            <Box display="flex" justifyContent="space-between" width="100%">
              <Button
                variant="outlined"
                onClick={() => {
                  setLoading(true);
                  fetchData();
                  setTimeout(() => setLoading(false), 5000); // show loader for 5 sec again
                }}
                sx={{ textTransform: "none" }}
              >
                Reload
              </Button>
              <Button
                variant="contained"
                onClick={onClose}
                sx={{ bgcolor: "#5A3E9E", color: "white", textTransform: "none" }}
              >
                Close
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
}

export default TransferMoney;
