import {
  Box,
  Table,
  TableCell,
  TableRow,
  TableBody,
  Typography,
  Divider,
  IconButton,
  Button,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function ViewInsurance({ show, setShow, id }) {
  const [insurance, setInsurance] = useState(null);
  const pdfRef = useRef(null);

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

  if (!insurance) return null;

  // 📌 Download PDF (with sharp text)
  const handleDownloadPDF = async () => {
    const element = pdfRef.current;
    const canvas = await html2canvas(element, { scale: 2 }); // higher resolution
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`insurance_${insurance.customerName}.pdf`);
  };

  // 📌 Reusable row component
  const RenderRow = ({ label, value, sx }) => (
    <TableRow>
      <TableCell sx={{ fontWeight: "bold", width: "40%" }}>{label}</TableCell>
      <TableCell align="right" sx={{ width: "60%", ...sx }}>
        {value}
      </TableCell>
    </TableRow>
  );

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
        borderRadius="12px"
        boxShadow="0 0 15px rgba(0,0,0,0.3)"
        width="800px"
        maxHeight="90vh"
        overflow="auto"
        sx={{
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": { display: "none" }, // Chrome, Edge
        }}
      >
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bgcolor="#4CAF50"
          color="white"
          px={3}
          py={2}
          borderTopLeftRadius="12px"
          borderTopRightRadius="12px"
        >
          <Typography variant="h6" fontWeight="bold">
            Insurance Details
          </Typography>
          <Box>
            <Button
              variant="outlined"
              size="small"
              sx={{
                color: "white",
                borderColor: "white",
                mr: 1,
                "&:hover": { bgcolor: "rgba(255,255,255,0.15)" },
              }}
              startIcon={<DownloadIcon />}
              onClick={handleDownloadPDF}
            >
              PDF
            </Button>
            <IconButton onClick={() => setShow(false)} sx={{ color: "white" }}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Content */}
        <Box p={3} ref={pdfRef}>
          {/* Agent Details */}
          <Typography variant="h6" sx={{ mt: 2, mb: 1, color: "#2E7D32" }}>
            Agent Details
          </Typography>
          <Table size="small" sx={{ bgcolor: "#E8F5E9", borderRadius: "6px" }}>
            <TableBody>
              <RenderRow label="Agent Name" value={insurance.agent} />
              <RenderRow label="Branch" value={insurance.branch} />
            </TableBody>
          </Table>

          <Divider sx={{ my: 2 }} />

          {/* Vehicle Details */}
          <Typography variant="h6" sx={{ mt: 2, mb: 1, color: "#2E7D32" }}>
            Vehicle Details
          </Typography>
          <Table size="small" sx={{ bgcolor: "#E8F5E9", borderRadius: "6px" }}>
            <TableBody>
              <RenderRow label="Owner Name" value={insurance.customerName} />
              <RenderRow label="Vehicle Number" value={insurance.vehicleNumber} />
              <RenderRow label="Inspection Photo" value={insurance.inspectionPhoto} />
            </TableBody>
          </Table>

          <Divider sx={{ my: 2 }} />

          {/* Policy Details */}
          <Typography variant="h6" sx={{ mt: 2, mb: 1, color: "#2E7D32" }}>
            Policy Details
          </Typography>
          <Table size="small" sx={{ bgcolor: "#E8F5E9", borderRadius: "6px" }}>
            <TableBody>
              <RenderRow label="Policy Type" value={insurance.policyType?.name} />
              <RenderRow label="Company Name" value={insurance.company?.name} />
              <RenderRow
                label="Status"
                value={insurance.status}
                sx={{
                  fontWeight: "bold",
                  color:
                    insurance.status === "Approved"
                      ? "green"
                      : insurance.status === "Pending"
                      ? "orange"
                      : "red",
                }}
              />
              <RenderRow
                label="Date"
                value={new Date(insurance.date).toLocaleDateString()}
              />
            </TableBody>
          </Table>

          <Divider sx={{ my: 2 }} />

          {/* Payment Details */}
          <Typography variant="h6" sx={{ mt: 2, mb: 1, color: "#2E7D32" }}>
            Payment Details
          </Typography>
          <Table size="small" sx={{ bgcolor: "#E8F5E9", borderRadius: "6px" }}>
            <TableBody>
              <RenderRow label="Net" value={insurance.net} />
              <RenderRow label="Premium" value={insurance.premium} />
              <RenderRow label="Commission" value={insurance.comm} />
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
}

export default ViewInsurance;
