import express from "express";
import dbConnect from "./config/dbConnect.js";
import dotenv from "dotenv";
import cors from 'cors'
dotenv.config();
const app = express();
app.use(
    cors({
      origin: [
        "http://localhost:3000/", 
      ],
      credentials: true,
    })
  );
dbConnect();
app.get("/logout", (req, res) => {
  console.log("system logouted");
});
app.listen(5000, () => {
  console.log("App is running on port 5000");
});
