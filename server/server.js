import express from "express";
import dbConnect from "./config/dbConnect.js";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
dbConnect();
app.use("/auth", authRouter);
app.listen(5000, () => {
  console.log("App is running on port 5000");
});
