import { Box, Typography, TextField, Button } from "@mui/material";
import bg from "../../images/bg.jpg";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

function Login() {
  const [dateTime, setDateTime] = useState(new Date());
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/auth/login", { userId });

      if (data.success) {
        // ✅ trigger redux to refresh & check auth again
        dispatch({ type: "refresh" });
      } else {
        alert(data.message || "Invalid Credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed. Try again!");
    }
  };

  return (
    <Box
      height="100vh"
      sx={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
      }}
    >
      {/* Time & Date */}
      <Box
        sx={{
          padding: "12px 20px",
          borderRadius: "12px",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            color: "white",
            lineHeight: 1.2,
          }}
        >
          {dateTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: "white",
            opacity: 0.8,
            fontSize: "1rem",
          }}
        >
          {dateTime.toLocaleDateString()}
        </Typography>
      </Box>

      {/* Glassmorphism Login Box */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: 300,
          padding: 4,
          borderRadius: "16px",
          background: "rgba(0, 95, 35, 0.1)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(0, 0, 0, 0.3)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6" color="white" textAlign="center">
          Login
        </Typography>

        <TextField
          label="User ID"
          variant="outlined"
          fullWidth
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          sx={{
            input: { color: "white" },
            label: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "rgba(255,255,255,0.2)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.3)",
            },
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
