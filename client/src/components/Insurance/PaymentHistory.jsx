import React, { useEffect, useState } from "react";
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
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination,
  IconButton,
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { motion } from "framer-motion";
import axios from "axios";
import ViewInsurance from "../../modals/ViewInsurance";
import EditInsurance from "../../modals/EditInsurance";

function PaymentHistory() {
  const [insurances, setInsurances] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 loading state
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("");
  const [type, setType] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [seletedId, setSelectedId] = useState("");
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/insurance/get-insurances");
        if (!data.err) setInsurances(data.insurances);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [refresh]);

  const handleDeleteInsurance = async (id) => {
    try {
      const { data } = await axios.delete(`/insurance/delete-insurance/${id}`);
      if (data.success) {
        alert("Insurance deleted successfully");
        setRefresh(!refresh);
        // optional: refresh list or filter out deleted company
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleViewModal = async (id) => {
    setSelectedId(id);
    await setShowViewModal(!showViewModal);
  };

  const handleEditModal = async (id) => {
    setSelectedId(id);
    await setShowEditModal(!showEditModal);
  };
  const rowsPerPage = 5;

  // Filter, Search, and Sort Logic
  const filteredData = insurances
    .filter(
      (row) =>
        row.customerName.toLowerCase().includes(search.toLowerCase()) ||
        row.vehicleNumber.toLowerCase().includes(search.toLowerCase())
    )
    .filter((row) => (month ? row.date.split("-")[1] === month : true))
    .filter((row) => (type ? row.InsuranceType === type : true))
    .sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    );

  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const rowVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6 },
    }),
  };

  return (
    <Box p={3}>
      {/* Heading */}
      <Typography variant="h5" fontWeight="bold" color="#333" mb={3}>
        Payment History
      </Typography>

      {/* Filters & Search */}
      <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
        <TextField
          label="Search by Name or Vehicle No."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
        />

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Month</InputLabel>
          <Select value={month} onChange={(e) => setMonth(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="01">January</MenuItem>
            <MenuItem value="02">February</MenuItem>
            <MenuItem value="03">March</MenuItem>
            <MenuItem value="04">April</MenuItem>
            <MenuItem value="05">May</MenuItem>
            <MenuItem value="06">June</MenuItem>
            <MenuItem value="07">July</MenuItem>
            <MenuItem value="08">August</MenuItem>
            <MenuItem value="09">September</MenuItem>
            <MenuItem value="10">October</MenuItem>
            <MenuItem value="11">November</MenuItem>
            <MenuItem value="12">December</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Loading */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress color="success" />
        </Box>
      ) : filteredData.length === 0 ? (
        // No Data State
        <Box display="flex" justifyContent="center" mt={5}>
          <Typography variant="h6" color="textSecondary">
            🚫 No records found
          </Typography>
        </Box>
      ) : (
        <>
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
                  <TableCell sx={{ fontWeight: "bold", color: "#2E7D32" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((row, index) => (
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
                    <TableCell>
                      {new Date(row.date).toLocaleDateString("en-GB")}
                    </TableCell>
                    <TableCell>{row.customerName}</TableCell>
                    <TableCell>{row.vehicleNumber}</TableCell>
                    <TableCell>{row?.policyType?.name}</TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color:
                          row.status === "Approved"
                            ? "green"
                            : row.status === "Rejected"
                            ? "red"
                            : "orange",
                      }}
                    >
                      {row.status}
                    </TableCell>
                    <TableCell>
                      <IconButton color="primary">
                        <VisibilityIcon
                          onClick={() => handleViewModal(row._id)}
                        />
                      </IconButton>
                      <IconButton color="primary">
                        <EditNoteIcon
                          onClick={() => handleEditModal(row._id)}
                        />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteInsurance(row._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box mt={3} display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(filteredData.length / rowsPerPage)}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="success"
            />
          </Box>
        </>
      )}
      {showViewModal && (
        <ViewInsurance
          show={showViewModal}
          setShow={setShowViewModal}
          id={seletedId}
        />
      )}

      {showEditModal && (
        <EditInsurance
          show={showEditModal}
          setShow={setShowEditModal}
          id={seletedId}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
    </Box>
  );
}

export default PaymentHistory;
