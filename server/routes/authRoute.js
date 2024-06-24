const express = require("express");
const router = express.Router();

const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");

const app = express();

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
app.use(cookieParser());
const verifyUser = require("../verify/verifyUser.js");

const Login = async (req, res) => {
  try {
    // const { email} = req.body;
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const auth = await bcrypt.compare(req.body.password, user.password);
    if (!auth) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    let token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      maxAge: 10 * 24 * 60 * 60 * 1000,
      withCredentials: true,
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    const { password, ...info } = user._doc;

    // console.log("ye user hai ", user);
    // console.log("ye login token hai ", token);
    // console.log("ye login cookie hai", req.cookies);
    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      user: info,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
    // console.log(error.message)
  }
};

const Logout = (req, res) => {
  // res.cookie("token", "");
  res.clearCookie("token");
  // console.log("logogogogo",req.cookies)
  // console.log("sdfsdfsdsdffsdfsdfsdf",req.cookies)
  if (req.cookies) {
    res.json({ status: true, message: "Logout successfully.." });
  } else {
    res.json({ status: false, message: "Connot Logout.." });
  }
};

const Signup = async (req, res) => {
  try {
    const { name, email, password, confpassword } = req.body;

    if (password.length < 6)
      return res
        .status(400)
        .json({ error: "Password length is greater or equal to 6" });

    if (password !== confpassword) {
      return res.status(400).json({ error: "Passward doesnt matched" });
    }
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "email already exsist" });
    }

    const username = await User.findOne({ name });

    if (username) {
      return res.status(400).json({ error: "username already exsist" });
    }
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        const createduser = await User.create({ name, email, password: hash });

        let token = jwt.sign({ email }, process.env.JWT_SECRET);

        res.cookie("token", token, {
          maxAge: 1 * 24 * 60 * 60 * 1000,
          withCredentials: true,
          httpOnly: true,
          secure: true,
          sameSite: "None",
        });
        // console.log("ye signup token hai ", token);
        // console.log("ye signup cookie hai", req.cookies);
        res.send({ message: "user registered successfully" });
      });
    });
    // res.send("signup")
  } catch (errorr) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(errorr.message);
  }
};

router.post("/login", Login);
router.post("/logout", verifyUser, Logout);
router.post("/signup", Signup);

router.get("/", verifyUser, (req, res) => {
  return res.json({ status: true, message: "Authorized user" });
});

module.exports = router;
