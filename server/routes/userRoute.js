const express = require("express");
const router = express.Router();

const Blog = require("../models/postModel.js");
const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");

const app = express();

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
app.use(cookieParser());

const updateUser = async (req, res) => {
  //   try {
  //     const { title, content, category, templatePic } = req.body();

  //     if (title || content || category || templatePic ==""){
  //         return res.status(400).json({ message: "All fields are required" });
  //     }
  //     const createdPost = await Blog.create({ title, content, category, templatePic });

  //   } catch (error) {
  //     res.status(500).json(error)
  //   }

  try {
    const { name, email, password, profilePic } = req.body;

    // const user = await User.findOne({ email });
    //         if(user._id==req.body._id){

    // }
    //     if (user) {
    //       return res.status(400).json({ error: "email already exsist" });
    //     }
    //     const username = await User.findOne({ email });

    //     if (username) {
    //       return res.status(400).json({ error: "username already exsist" });
    //     }

    if (req.body.password) {
      bcrypt.genSalt(10, function (err, salt) {
        req.body.password = bcrypt.hash(req.body.password, salt);
      });
    }
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        const updateduser = await User.findByIdAndUpdate(
          req.params.id,
          { $set: { name, email, password: hash ,profilePic} },
          { new: true }
        );

        let token = jwt.sign({ email }, process.env.JWT_SECRET);

        res.cookie("token", token, {
          maxAge: 1 * 24 * 60 * 60 * 1000,
          withCredentials: true,
          httpOnly: false,
        });
        console.log("ye updated token hai ", token);
        console.log("ye updated cookie hai", req.cookies);
        res.send({ message: "user updated successfully" });
      });
    });
  } catch (errorr) {
    res
      .status(500)
      .json({ error: "Is name ka yaa fir is email se koi pahle se user hai" });
    console.log(errorr.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { title, content, category, templatePic } = req.body();

    if (title || content || category || templatePic == "") {
      return res.status(400).json({ message: "All fields are required" });
    }
    const createdPost = await Blog.create({
      title,
      content,
      category,
      templatePic,
    });
  } catch (error) {}
};

const getUser = async (req, res) => {
  try {
    const { title, content, category, templatePic } = req.body();

    if (title || content || category || templatePic == "") {
      return res.status(400).json({ message: "All fields are required" });
    }
    const createdPost = await Blog.create({
      title,
      content,
      category,
      templatePic,
    });
  } catch (error) {}
};

router.put("/update/:id", updateUser);
// router.delete("/logout", Logout);
// router.get("/signup", Signup);

module.exports = router;
