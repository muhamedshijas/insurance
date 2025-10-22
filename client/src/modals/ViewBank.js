import {
  Box,
  Typography,
  Button,
  Divider,
  IconButton,
  CircularProgress,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CloseRounded, RefreshRounded } from "@mui/icons-material";
import TransferMoney from "./TranseferMoney";
import axios from "axios";

function ViewBank({
  showViewModal,
  setShowViewModal,
  id,
  refresh,
  setRefresh,
}) {
  const [transferOpen, setTransferOpen] = useState(false);
  const [bank, setBank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleClose = () => setShowViewModal(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(false);

    const timer = setTimeout(async () => {
      try {
        const { data } = await axios.get(`/acc/get-accbyid/${id}`);
        if (data?.bank) setBank(data.bank);
        else setError(true);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [id, refresh]);

  if (!showViewModal) return null;

  return (
    <Box
      width="100vw"
      height="100vh"
      position="fixed"
      top={0}
      left={0}
      bgcolor="rgba(0,0,0,0.35)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex={1200}
    >
      <Box
        width="600px"
        maxHeight="90vh"
        overflow="auto"
        bgcolor="white"
        borderRadius="16px"
        boxShadow="0 0 25px rgba(0,0,0,0.2)"
        sx={{
          "&::-webkit-scrollbar": { display: "none" },
          position: "relative",
        }}
      >
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bgcolor="#6C4AB6"
          color="white"
          px={3}
          py={2}
          borderTopLeftRadius="16px"
          borderTopRightRadius="16px"
        >
          <Typography variant="h6" fontWeight="bold">
            Bank Details
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseRounded sx={{ color: "white" }} />
          </IconButton>
        </Box>

        {/* Body */}
        <Box p={3}>
          {loading ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="300px"
            >
              <CircularProgress sx={{ color: "#6C4AB6", mb: 2 }} />
              <Typography variant="body1" color="textSecondary">
                Loading account details...
              </Typography>
            </Box>
          ) : error ? (
            <Box
              textAlign="center"
              height="300px"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h6" color="error" mb={1}>
                Failed to load bank details ❌
              </Typography>
              <Button
                variant="outlined"
                startIcon={<RefreshRounded />}
                onClick={() => window.location.reload()}
              >
                Reload
              </Button>
            </Box>
          ) : (
            <>
              {/* Scroll Indicator */}
              <Box textAlign="center" mb={1}></Box>

              <Grid container spacing={2} direction="column">
                {/* Bank Information */}
                <Grid item xs={12}>
                  <InfoCard title="Bank Information">
                    <Field label="Bank Name" value={bank.bankName} />
                    <Field label="Branch" value={bank.branch} />
                    <Field label="IFSC Code" value={bank.ifscCode} />
                    <Field label="Branch Address" value={bank.branchAddress} />
                  </InfoCard>
                </Grid>

                {/* Account Information */}
                <Grid item xs={12}>
                  <InfoCard title="Account Information">
                    <Field label="Account Holder" value={bank.ownerName} />
                    <Field label="Mobile Number" value={bank.mobileNo} />
                    <Field label="Account Number" value={bank.accNo} />
                    <Field label="Account Type" value={bank.accountType} />
                    <Field label="Account Info" value={bank.accountInfo} />
                    <Field
                      label="Status"
                      value={bank.isActive ? "Active ✅" : "Inactive ❌"}
                    />
                  </InfoCard>
                </Grid>

                {/* Balance Section (full width) */}
                <Grid item xs={12}>
                  <InfoCard title="Balance Available">
                    <Box
                      p={2}
                      bgcolor="#f3e8ff"
                      borderRadius="12px"
                      textAlign="center"
                    >
                      <Typography variant="subtitle2" color="#6C4AB6">
                        Total Balance
                      </Typography>
                      <Typography
                        variant="h4"
                        fontWeight="bold"
                        color="#6C4AB6"
                      >
                        ₹{bank.amountAvailable.toLocaleString()}
                      </Typography>
                    </Box>
                  </InfoCard>
                </Grid>
              </Grid>

              {/* Sticky Transfer Button */}
              <Box
                position="sticky"
                bottom={0}
                mt={2}
                p={1.5}
                bgcolor="white"
                borderTop="1px solid #eee"
              >
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: "#6C4AB6",
                    color: "white",
                    py: 1.2,
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": { bgcolor: "#55359a" },
                  }}
                  onClick={() => setTransferOpen(true)}
                >
                  Transfer Money
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>

      {transferOpen && (
        <TransferMoney
          open={transferOpen}
          onClose={() => setTransferOpen(false)}
          bankId={bank?._id}
          bankName={bank?.bankName}
          amountAvailable={bank?.amountAvailable}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
    </Box>
  );
}

// Reusable Components
const InfoCard = ({ title, children }) => (
  <Box
    mb={2}
    p={2}
    bgcolor="#fafafa"
    borderRadius="12px"
    sx={{ border: "1px solid #eee" }}
  >
    <Typography variant="subtitle1" fontWeight="bold" color="#6C4AB6" mb={1.5}>
      {title}
    </Typography>
    {children}
  </Box>
);

const Field = ({ label, value }) => (
  <Box display="flex" justifyContent="space-between" mb={1}>
    <Typography fontWeight={600} color="#555">
      {label}:
    </Typography>
    <Typography color="#333">{value || "-"}</Typography>
  </Box>
);

export default ViewBank;
