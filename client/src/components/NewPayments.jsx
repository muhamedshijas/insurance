import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AddData from "../modals/AddData";
import axios from "axios";

function NewPayments() {
  const [show, setShow] = useState(false);
  const [insurances, setInsurances] = useState([]);

  const handleShow = () => {
    setShow(!show);
  };
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/insurance/get-insurances");
        if (!data.err) setInsurances(data.insurances);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [insurances]);

  // Animation variant
  const rowVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <Box p={3}>
      {/* Header Section */}
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" fontWeight="bold" color="#333">
          Today's Payment
        </Typography>
        <Button
          sx={{
            background: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            fontWeight: 500,
            borderRadius: "5px",
            "&:hover": {
              background: "#43A047",
            },
          }}
          onClick={handleShow}
        >
          Add New Payment
        </Button>
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{ boxShadow: 3, borderRadius: "8px" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#E8F5E9" }}>
              <TableCell sx={{ fontWeight: "bold", color: "#2E7D32" }}>
                Date
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#2E7D32" }}>
                Owner Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#2E7D32" }}>
                Vehicle Number
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#2E7D32" }}>
                Insurance Type
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#2E7D32" }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {insurances.map((row, index) => (
              <motion.tr
                key={index}
                variants={rowVariant}
                initial="hidden"
                animate="visible"
                custom={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F1F8E9",
                  cursor: "pointer",
                }}
                whileHover={{ backgroundColor: "#DCEDC8" }}
              >
                <TableCell>{new Date(row.date).toLocaleDateString("en-GB")}</TableCell>
                <TableCell>{row.customerName}</TableCell>
                <TableCell>{row.vehicleNumber}</TableCell>
                <TableCell>{row?.policyType?.name}</TableCell>
                <TableCell>{row.status}</TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {show && <AddData show={show} setShow={setShow} />}
    </Box>
  );
}

export default NewPayments;
