import React, { useState } from "react";
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
} from "@mui/material";
import { motion } from "framer-motion";
import { Plus, Trash2, ChevronDown, ChevronUp, Building2, FileText } from "lucide-react";

const MotionCard = motion(Card);

export default function Catlog() {
  const [showPolicy, setShowPolicy] = useState(true);
  const [showCompany, setShowCompany] = useState(true);

  const themeGreen = "#2e7d32"; // sidebar green you shared

  return (
    <Box p={3} bgcolor="#f9fafb" minHeight="100vh">
      {/* Policy Type Section */}
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        sx={{
          mb: 3,
          borderRadius: 3,
          boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
          backgroundColor: "white",
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <FileText size={22} color={themeGreen} />
              <Typography variant="h6" fontWeight="bold" color={themeGreen}>
                Policy Types
              </Typography>
            </Box>
            <Box>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: themeGreen,
                  "&:hover": { backgroundColor: "#256628" },
                  mr: 1,
                }}
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
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Policy Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[{ id: 1, name: "Health Insurance" }].map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        <IconButton color="error">
                          <Trash2 size={18} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <Building2 size={22} color={themeGreen} />
              <Typography variant="h6" fontWeight="bold" color={themeGreen}>
                Companies
              </Typography>
            </Box>
            <Box>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: themeGreen,
                  "&:hover": { backgroundColor: "#256628" },
                  mr: 1,
                }}
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
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Company Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[{ id: 1, name: "LIC" }].map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        <IconButton color="error">
                          <Trash2 size={18} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
          )}
        </CardContent>
      </MotionCard>
    </Box>
  );
}
