import { Box, Typography } from '@mui/material'
import React from 'react'

function ViewBank() {
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
          </Box>
          </Box>
          </Box>
          
  )
}

export default ViewBank
