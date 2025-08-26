import express from "express";
import { checkAuth, login, logout } from "../controllers/authController.js";
const router = express.Router();

router.post("/login", login);
router.get("/checkauth", checkAuth);
router.get("/logout", logout);

export default router;
