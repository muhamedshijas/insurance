import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Divider,
  TableContainer,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Building2,
  FileText,
} from "lucide-react";
import AddPolicy from "../modals/AddPolicy";
import AddCompany from "../modals/AddCompany";
import axios from "axios";
import { useTheme } from "@mui/material/styles";

const MotionCard = motion(Card);

export default function Catlog() {
  const [showPolicy, setShowPolicy] = useState(true);
  const [showCompany, setShowCompany] = useState(true);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [policies, setPolicies] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const themeGreen = "#2e7d32";

  // Fetch companies
  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/catlog/get-companies");
        if (!data.err) {
          setCompanies(data.companies);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [companies]);

  // Fetch policies
  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/catlog/get-policies");
        if (!data.err) {
          setPolicies(data.policies);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [policies]);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/catlog/delete-company/${id}`);
      if (data.success) {
        alert("Company deleted successfully");
        // optional: refresh list or filter out deleted company
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <Box
      p={isMobile ? 2 : 3}
      bgcolor="#f9fafb"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      gap={3}
    >
      {/* Policy Type Section */}
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        sx={{
          borderRadius: 3,
          boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
          backgroundColor: "white",
        }}
      >
        <CardContent>
          <Box
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            alignItems={isMobile ? "flex-start" : "center"}
            justifyContent="space-between"
            gap={1}
            mb={2}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <FileText size={22} color={themeGreen} />
              <Typography variant="h6" fontWeight="bold" color={themeGreen}>
                Policy Types
              </Typography>
            </Box>
            <Box>
              <Button
                onClick={() => setShowPolicyModal(true)}
                variant="contained"
                sx={{
                  backgroundColor: themeGreen,
                  "&:hover": { backgroundColor: "#256628" },
                  mr: 1,
                  textTransform: "none",
                }}
                size={isMobile ? "small" : "medium"}
                startIcon={<Plus size={18} />}
              >
                Add
              </Button>
              <IconButton onClick={() => setShowPolicy(!showPolicy)}>
                {showPolicy ? <ChevronUp /> : <ChevronDown />}
              </IconButton>
            </Box>
          </Box>

          {showPolicy && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Divider sx={{ mb: 2 }} />
              <TableContainer component={Paper}>
                <Table size={isMobile ? "small" : "medium"}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>SI No</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Policy Name
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {policies.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          No Policies Found
                        </TableCell>
                      </TableRow>
                    ) : (
                      policies.map((row, index) => (
                        <TableRow key={row._id || index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>
                            <IconButton color="error">
                              <Trash2 size={18} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </motion.div>
          )}
        </CardContent>
      </MotionCard>

      {/* Company Section */}
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        sx={{
          borderRadius: 3,
          boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
          backgroundColor: "white",
        }}
      >
        <CardContent>
          <Box
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            alignItems={isMobile ? "flex-start" : "center"}
            justifyContent="space-between"
            gap={1}
            mb={2}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Building2 size={22} color={themeGreen} />
              <Typography variant="h6" fontWeight="bold" color={themeGreen}>
                Companies
              </Typography>
            </Box>
            <Box>
              <Button
                onClick={() => setShowCompanyModal(true)}
                variant="contained"
                sx={{
                  backgroundColor: themeGreen,
                  "&:hover": { backgroundColor: "#256628" },
                  mr: 1,
                  textTransform: "none",
                }}
                size={isMobile ? "small" : "medium"}
                startIcon={<Plus size={18} />}
              >
                Add
              </Button>
              <IconButton onClick={() => setShowCompany(!showCompany)}>
                {showCompany ? <ChevronUp /> : <ChevronDown />}
              </IconButton>
            </Box>
          </Box>

          {showCompany && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Divider sx={{ mb: 2 }} />
              <TableContainer component={Paper}>
                <Table size={isMobile ? "small" : "medium"}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>SI No</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Company Name
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {companies.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          No Companies Found
                        </TableCell>
                      </TableRow>
                    ) : (
                      companies.map((row, index) => (
                        <TableRow key={row._id || index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>
                            <IconButton
                              color="error"
                              onClick={() => handleDelete(row._id)}
                            >
                              <Trash2 size={18} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </motion.div>
          )}
        </CardContent>
      </MotionCard>

      {/* Modals */}
      {showPolicyModal && (
        <AddPolicy
          show={showPolicyModal}
          setShow={setShowPolicyModal}
          setRefresh={setRefresh}
        />
      )}
      {showCompanyModal && (
        <AddCompany
          show={showCompanyModal}
          setShow={setShowCompanyModal}
          setRefresh={setRefresh}
        />
      )}
    </Box>
  );
}
