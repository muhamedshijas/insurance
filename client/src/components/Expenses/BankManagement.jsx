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
} from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import AddBank from "../../modals/AddBank";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import ViewBank from "../../modals/ViewBank";
import DeleteIcon from "@mui/icons-material/Delete";

function BankManagement() {
  const [show, setShow] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [banks, setBanks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [seletedId, setSelectedId] = useState("");

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/acc/get-acc");
        if (!data.err) {
          setBanks(data.banks);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [refresh]);
  const handleModal = () => {
    setShow(!show);
  };
  const handleViewModal = (id) => {
    setSelectedId(id);
    setShowViewModal(!showViewModal);
  };
  const handleDeleteAcc = async (id) => {
    const { data } = await axios.delete(`/acc/delete-acc/${id}`);
    if (data.success) {
      alert("Account Deleted Successfull");
      setRefresh(!refresh);
    }
  };
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
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ color: "#5A3E9E" }}>
          Bank Management
        </Typography>

        <Button
          variant="contained"
          onClick={handleModal}
          sx={{
            width: "160px",
            bgcolor: "#654ea3",
            "&:hover": { bgcolor: "#5A3E9E" },
          }}
        >
          Add New
        </Button>
      </Box>

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
                Bank Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#5A3E9E" }}>
                Account Number
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#5A3E9E" }}>
                Amount Available
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#5A3E9E" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {banks.map((row, index) => (
              <motion.tr
                key={index}
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
                <TableCell>{row.bankName}</TableCell>
                <TableCell>{row.accNo}</TableCell>
                <TableCell>{row.amountAvailable}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <VisibilityIcon onClick={() => handleViewModal(row._id)} />
                  </IconButton>
                  <IconButton color="error">
                    <DeleteIcon onClick={() => handleDeleteAcc(row._id)} />
                  </IconButton>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {show && (
        <AddBank
          show={show}
          setShow={setShow}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
      {showViewModal && (
        <ViewBank
          showViewModal={showViewModal}
          setShowViewModal={setShowViewModal}
          id={seletedId}
        />
      )}
    </Box>
  );
}

export default BankManagement;
