import express from "express";
import dbConnect from "./config/dbConnect.js";
import dotenv from "dotenv";
dotenv.config()
const app = express();
dbConnect();
app.listen(5000, () => {
  console.log("App is running on port 5000");
});
