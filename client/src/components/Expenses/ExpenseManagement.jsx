import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  MenuItem,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import AddTransactions from "../../modals/AddTransactions";

function ExpenseManagement() {
  const [transactions, setTransactions] = useState([]);
  const [banks, setBanks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [filterBank, setFilterBank] = useState("");
  const [filterType, setFilterType] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  useEffect(() => {
    (async function fetchData() {
      try {
        const { data: bankData } = await axios.get("/acc/get-acc");
        if (!bankData.err) setBanks(bankData.banks);

        const { data: transactionData } = await axios.get(
          "/acc/transaction/get-transactions"
        );
        if (!transactionData.err) setTransactions(transactionData.transactions);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [refresh]);

  const handleView = (transaction) => {
    console.log(transaction);
  };

  const filteredTransactions = transactions.filter((t) => {
    return (
      (filterBank ? t.bank?._id === filterBank : true) &&
      (filterType ? t.type === filterType : true)
    );
  });

  const rowVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.4 },
    }),
  };

  return (
    <Box p={3}>
      {/* Header */}
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ color: "#5A3E9E" }}>
          Transactions
        </Typography>

        <Button
          variant="contained"
          sx={{
            width: "240px",
            bgcolor: "#654ea3",
            "&:hover": { bgcolor: "#5A3E9E" },
          }}
          onClick={handleAddModal}
        >
          Add New Transaction
        </Button>
      </Box>

      {/* Filter bar */}
      <Box display="flex" gap={2} mb={2} flexWrap="wrap" alignItems="center">
        <TextField
          select
          label="Filter by Bank"
          size="small"
          value={filterBank}
          onChange={(e) => setFilterBank(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">All Banks</MenuItem>
          {banks.map((bank) => (
            <MenuItem key={bank._id} value={bank._id}>
              {bank.bankName}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Filter by Type"
          size="small"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All Types</MenuItem>
          <MenuItem value="Income">Income</MenuItem>
          <MenuItem value="Expense">Expense</MenuItem>
          <MenuItem value="Transfer">Transfer</MenuItem>
        </TextField>
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 3,
          borderRadius: "10px",
          backgroundColor: "#ffffff",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f3e8ff" }}>
              <TableCell sx={{ fontWeight: "bold", color: "#5A3E9E" }}>
                S.No
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#5A3E9E" }}>
                Date
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#5A3E9E" }}>
                Type
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#5A3E9E" }}>
                Description
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#5A3E9E" }}>
                Amount
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#5A3E9E" }}>
                Bank
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#5A3E9E" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredTransactions.map((row, index) => (
              <motion.tr
                key={row._id}
                variants={rowVariant}
                initial="hidden"
                animate="visible"
                custom={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8f5ff",
                  cursor: "pointer",
                }}
                whileHover={{ backgroundColor: "#efe6ff" }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>₹{row.amount}</TableCell>
                <TableCell>{row.bank?.bankName || "-"}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleView(row)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {showAddModal && (
        <AddTransactions
          show={showAddModal}
          setShow={setShowAddModal}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
    </Box>
  );
}

export default ExpenseManagement;
