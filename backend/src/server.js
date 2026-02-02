import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./libs/db.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import { protectedRoute } from "./middlewares/authMiddleware.js";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

//middlewares
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

//public route
app.use("/api/auth", authRoute);

//private route
app.use(protectedRoute);
app.use("/api/users", userRoute);

//connect db
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`);
  });
});
