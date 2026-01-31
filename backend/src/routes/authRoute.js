import express from "express";
import { signUp } from "../controllers/authController.js";

const router = express.Router();

router.post("/signUp", signUp);

export default router;
