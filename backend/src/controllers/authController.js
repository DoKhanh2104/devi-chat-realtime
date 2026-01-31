import User from "../models/User.js";
import bcrypt from "bcrypt";

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
