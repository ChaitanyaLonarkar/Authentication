const express = require("express");
const router = express.Router();

// const Signup=require("../controller/authcontroller")
// const Login=require("../controller/authcontroller")
// const Logout=require("../controller/authcontroller")

const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");

const app = express();

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
app.use(cookieParser());

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    let token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
    });
    console.log("ye login token hai ", token);
    console.log("ye login cookie hai", req.cookies);
    res
      .status(200)
      .json({ message: "User logged in successfully", success: true });

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
  // res.send("login");
  //   res.cookie("tokenn", "");
  //  res.redirect("/")
};

const Logout = (req, res) => {
  res.cookie("token", "");
  res.send("logout hu m");
  //  res.redirect("/")
};

const Signup = async (req, res) => {
  try {
    const { name, email, password, confpassword } = req.body;
    // if (name || email || password || confpassword == "") {
    //   return res.status(400).json({ error: " field should not empty" });
    // }
    if(password.length<6) return res.status(400).json({ error: "Password length is greater or equal to 6" });

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

        res.cookie("token", token,{
          withCredentials: true,
          httpOnly: false,
        });
        console.log("ye signup token hai ", token);
        console.log("ye signup cookie hai", req.cookies);
        res.send({message:"user registered successfully"});
      });
    });
    // res.send("signup")
  } catch (errorr) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(errorr.message);
  }
};

router.post("/login", Login);
router.post("/logout", Logout);
router.post("/signup", Signup);

module.exports = router;
