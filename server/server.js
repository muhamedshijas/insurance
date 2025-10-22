import express from "express";
import dbConnect from "./config/dbConnect.js";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import catlogRouter from "./routes/Insurance/catlogRouter.js";
import insuranceRouter from "./routes/Insurance/insuranceRouter.js";
import reportsRouter from "./routes/Insurance/reportsRouter.js";
import accountRouter from "./routes/Expense/accountRouter.js";
import transactionRouter from "./routes/Expense/transactionRouter.js";
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
app.use("/catlog", catlogRouter);
app.use("/insurance", insuranceRouter);
app.use("/reports", reportsRouter);
app.use("/acc", accountRouter);
app.use("/acc/transaction", transactionRouter);
app.listen(5000, () => {
  console.log("App is running on port 5000");
});
