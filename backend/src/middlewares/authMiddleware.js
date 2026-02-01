import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectedRoute = (request, response, next) => {
  try {
    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return response.status(401).json({ message: "Token not found" });
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      async (error, decodedUser) => {
        if (error) {
          console.error(error);
          return response
            .status(403)
            .json({ mess: "Token invalid or expired" });
        }

        const user = await User.findById(decodedUser.userId).select(
          "-hashedPassword",
        );

        if (!user) {
          return response.status(401).json({ message: "User not found" });
        }

        request.user = user;
        next();
      },
    );
  } catch (error) {
    console.error("Failed to verify", error);
    return response.status(500).json({ message: "Internal Server error" });
  }
};
