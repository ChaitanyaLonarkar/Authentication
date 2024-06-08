const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const express = require("express");

const app = express();

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
app.use(cookieParser());


const Login = (req, res) => {
  res.send("login");
  //   res.cookie("tokenn", "");
  //  res.redirect("/")
};

module.exports = Login;

const Logout = (req, res) => {
  res.send("logout hu m");
  //   res.cookie("tokenn", "");
  //  res.redirect("/")
  };

  module.exports = Logout;
  
  const Signup = async (req, res) => {
    try {
      const { name, email, password, confpassword } = req.body();
      if (name || email || password || confpassword == "") {
        return res.status(400).json({ error: " field should not empty" });
      }
      if (password !== confpassword) {
        return res.status(400).json({ error: "Passward doesnt matched" });
      }
      const user = await User.findOne({ email });
  
      if (user) {
        return res.status(400).json({ error: "email already exsist" });
      }
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          const createduser = await User.create({ name, email, password: hash });
  
          let token = jwt.sign({ email }, process.env.JWT_SECRET);
  
          res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
          });
          console.log("ye signup token hai ", token);
          console.log("ye signup cookie hai", req.cookies);
          res.send(createduser);
        });
      });
      // res.send("signup")
    } catch (error) {}
  };
  
  module.exports = Signup;