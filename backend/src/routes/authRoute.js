import express from "express";
import {
  signIn,
  signUp,
  signOut,
  refreshToken,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/signOut", signOut);
router.post("/refresh", refreshToken);

export default router;
