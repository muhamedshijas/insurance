import express from "express";
import { checkAuth, login } from "../controllers/authController.js";
const router = express.Router();

router.post("/login", login);
router.get("/checkauth", checkAuth);

export default router;
