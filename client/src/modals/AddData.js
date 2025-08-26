import React, { useState } from "react";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Divider,
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";

const steps = [
  "Customer Details",
  "Policy Details",
  "Company & Payment",
  "Preview",
];

export default function AddData({ show, setShow }) {
  const handleShow = () => {
    setShow(!show);
  };
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    branch: "",
    agent: "",
    customerName: "",
    vehicleNumber: "",
    policyType: "",
    inspectionPhoto: "",
    company: "",
    net: "",
    premium: "",
    comm: "",
  });

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      console.log("✅ Final Submit Data:", formData);
      alert("Data Submitted Successfully!");
      // here you can send formData to backend
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          <Typography variant="h6" gutterBottom>
            Add Data
          </Typography>
          <Button onClick={handleShow}>
            <CloseRounded />{" "}
          </Button>
        </Box>

        {/* Stepper */}
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box mt={3}>
          {/* Step 1: Customer Details */}
          {activeStep === 0 && (
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
              />
              <TextField
                label="Agent Name"
                name="agent"
                value={formData.agent}
                onChange={handleChange}
              />
              <TextField
                label="Customer Name"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
              />
            </Box>
          )}

          {/* Step 2: Policy Details */}
          {activeStep === 1 && (
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Vehicle Number"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleChange}
              />
              <TextField
                label="Policy Type"
                name="policyType"
                value={formData.policyType}
                onChange={handleChange}
              />
              <TextField
                label="Inspection Photo (Yes/No)"
                name="inspectionPhoto"
                value={formData.inspectionPhoto}
                onChange={handleChange}
              />
            </Box>
          )}

          {/* Step 3: Company & Payment */}
          {activeStep === 2 && (
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
              <TextField
                label="Net"
                name="net"
                value={formData.net}
                onChange={handleChange}
              />
              <TextField
                label="Premium"
                name="premium"
                value={formData.premium}
                onChange={handleChange}
              />
              <TextField
                label="Comm"
                name="comm"
                value={formData.comm}
                onChange={handleChange}
              />
            </Box>
          )}

          {/* Step 4: Preview */}
          {activeStep === 3 && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Preview Your Data
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {Object.entries(formData).map(([key, value]) => (
                <Box
                  key={key}
                  display="flex"
                  justifyContent="space-between"
                  mb={1}
                >
                  <Typography variant="body2" fontWeight="bold">
                    {key.toUpperCase()}
                  </Typography>
                  <Typography variant="body2">{value || "—"}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* Navigation buttons */}
        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
