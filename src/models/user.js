const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, minLength: 4, maxLength: 50 },
    lastName: String,
    emailId: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      trim: true,
    },
    password: { type: String, required: true },
    age: { type: Number, min: 18 },
    gender: String,
    photoUrl: {
      type: String,
      default:
        "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png",
    },
    about: {
      type: String,
      default: "This is the default value for the New User",
    },
    skills: { type: [String] },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
