const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    
    profilePic: {
      type: String,
      default: "user.jpg",
      required:false,
    },
    myblogs:{
      type: Array,
      required:false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports= User;