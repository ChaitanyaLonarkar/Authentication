// const User = require("../models/userModel.js");
// const bcrypt = require("bcrypt");
// const express = require("express");

// const app = express();

// const cookieParser = require("cookie-parser");
// const jwt = require("jsonwebtoken");
// app.use(cookieParser());


// const Login = async(req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     const auth = await bcrypt.compare(password, user.password);
//     if (!auth) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     let token = jwt.sign({ email }, process.env.JWT_SECRET);
//     res.cookie("token", token, {
//       withCredentials: true,
//       httpOnly: true,
//     });

//     res.status(200).json({ message: "User logged in successfully", success: true });
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
//   // res.send("login");
//   //   res.cookie("tokenn", "");
//   //  res.redirect("/")
// };

// module.exports = Login;

// const Logout = (req, res) => {
//   res.send("logout hu m");
//   //   res.cookie("tokenn", "");
//   //  res.redirect("/")
//   };

//   module.exports = Logout;
  
//   const Signup = async (req, res) => {
//     try {
//       const { name, email, password, confpassword } = req.body;
//       // if (name || email || password || confpassword == "") {
//       //   return res.status(400).json({ error: " field should not empty" });
//       // }
//       if (password !== confpassword) {
//         return res.status(400).json({ error: "Passward doesnt matched" });
//       }
//       const user = await User.findOne({ email });
  
//       if (user) {
//         return res.status(400).json({ error: "email already exsist" });
//       }
//       bcrypt.genSalt(10, function (err, salt) {
//         bcrypt.hash(password, salt, async function (err, hash) {
//           const createduser = await User.create({ name, email, password: hash });
  
//           let token = jwt.sign({ email }, process.env.JWT_SECRET);
  
//           res.cookie("token", token, {
//             withCredentials: true,
//             httpOnly: false,
//           });
//           console.log("ye signup token hai ", token);
//           console.log("ye signup cookie hai", req.cookies);
//           res.send(createduser);
//         });
//       });
//       // res.send("signup")
//     } catch (errorr) {
//       res.status(500).json({ error: "Internal Server Error"});
//       console.log(errorr.message )
//     }
//   };

//   // const Signupp = async (req, res) => {
//   //   try {
//   //     console.log(req.body)
//   //     const { name, email, password, confPassword } = req.body;
//   //     console.log(password,confPassword)
//   //     if (password !== confPassword) {
//   //       return res.status(400).json({ error: "Passwords don't match" });
//   //     }
  
//   //     const user = await User.findOne({ email });
//   //     if (user) {
//   //       return res.status(400).json({ error: "Email already exists" });
//   //     }
  
//   //     bcrypt.genSalt(10, function (err, salt) {
//   //       if (err) return res.status(500).json({ error: "Internal Server Error" });
  
//   //       bcrypt.hash(password, salt, async function (err, hash) {
//   //         if (err) return res.status(500).json({ error: "Internal Server Error" });
  
//   //         const createdUser = await User.create({ name, email, password: hash });
  
//   //         let token = jwt.sign({ email }, process.env.JWT_SECRET);
//   //         res.cookie("token", token, {
//   //           withCredentials: true,
//   //           httpOnly: true,
//   //         });
//   //         res.status(201).json({ message: "User created successfully", user: createdUser });
//   //       });
//   //     });
//   //   } catch (error) {
//   //     res.status(500).json({ error: "Internal Server Error" });
//   //   }
//   // };
  
  
//   module.exports = Signup;