const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // phone: {
  //     type: String,
  //     required: true,
  //     unique: true,
  // },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  passwordResetToken: {
    type: String,
    default: null,
  },
  passwordResetExpires: {
    type: Date,
    default: null,
  },
  Token: {
    type: String,
    default: null,
  },
  RefreshToken: {
    type: String,
    default: null,
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
