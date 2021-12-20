const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "the field is required"],
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "the field is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "the field is required"],
      trim: true,
    },
    role:{
      type: String,
      enum: ['user', 'Admin'],
      default: 'user'
    },
    profile_img: String,
    password: {
      type: String,
      required: [true, "the field is required"],
      trim: true,
    },
  },
  { timestamps: true }
);
const User = mongoose.model('User', UserSchema);

module.exports = User;