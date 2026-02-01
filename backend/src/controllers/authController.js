import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Session } from "../models/Session.js";

const ACCESS_TOKEN_TTL = "30m";
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000;

export const signUp = async (request, response) => {
  try {
    const { username, password, email, firstName, lastName } = request.body;

    if (!username || !password || !email || !firstName || !lastName) {
      return response.status(401).json({
        message: "Username, Password, Email, FirstName, LastName is required",
      });
    }

    const duplicateUsername = await User.findOne({ username });
    if (duplicateUsername) {
      return response.status(409).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      hashedPassword,
      email,
      displayName: `${firstName} ${lastName}`,
    });

    return response.status(200).json({ message: "Create user successfully" });
  } catch (error) {
    console.error("Failed to sign up", error);
    return response.status(500).json({ message: "Inter Server Error" });
  }
};

export const signIn = async (request, response) => {
  try {
    const { username, password } = request.body;
    if (!username || !password) {
      return response
        .status(401)
        .json({ message: "Username, password is required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return response.status(401).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.hashedPassword,
    );
    if (!isPasswordCorrect) {
      return response.status(401).json({ message: "Password invalid" });
    }

    // Compare is true
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: ACCESS_TOKEN_TTL },
    );

    const refreshToken = crypto.randomBytes(64).toString("hex");

    await Session.create({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
    });

    return response.status(200).json(`User ${username} is signed in `);
  } catch (error) {
    console.error("Failed to sign in", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
};
