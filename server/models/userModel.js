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
      default: "https://firebasestorage.googleapis.com/v0/b/blog-app-32552.appspot.com/o/files%2Fuser.jpg?alt=media&token=27f9dd1d-be27-4e59-a4f0-9b68c9eb6b8e",
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