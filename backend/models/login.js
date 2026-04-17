const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  referral: { type: String },

  email: { type: String, required: true, unique: true },

  otp: { type: String },
  otpExpiry: { type: Date },

  isVerified: { type: Boolean, default: false },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;


