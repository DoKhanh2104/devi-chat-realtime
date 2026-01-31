import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hashedPassword: {
      type: String,
      require: true,
    },
    displayName: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    avatarUrl: {
      type: String,
    },
    avatarId: {
      type: String,
    },
    bio: {
      type: String,
      maxlenght: 500,
    },
    phone: {
      type: String,
      sparse: true,
    },
  },
  {
    timestamp: true,
  },
);

const User = mongoose.model("User", userSchema);
export default User;
