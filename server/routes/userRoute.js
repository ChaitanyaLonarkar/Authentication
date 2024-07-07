const express = require("express");
const router = express.Router();

const Blog = require("../models/postModel.js");
const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");

const app = express();

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const Comments = require("../models/commentModel.js");
app.use(cookieParser());
const verifyUser=require("../verify/verifyUser.js")

const updateUser = async (req, res) => {

  try {
    const { name, email, password, profilePic } = req.body;
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
        const {password,...info}=updateduser._doc 

        // console.log("ye updated token hai ", token);
        // console.log("ye updated cookie hai", req.cookies);
        res.send({ sucess:true,message: "user updated successfully",updatedUser :
           info});
      });
    });
  } catch (errorr) {
    res
      .status(500)
      .json({ error: "Is name ka yaa fir is email se koi pahle se user hai" });
    // console.log(errorr.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    // const { title, content, category, templatePic } = req.body();
    await User.findByIdAndDelete(req.params.id)
    await Blog.deleteMany({userId:req.params.id})
    await Comments.deleteMany({userId:req.params.id})
    res.status(200).json({sucess:true,message:"User has been deleted"})
    res.clearCookie("token");

  } catch (error) {
    res.status(500).json({sucess:false,message:"Unable to delete user"})
    // console.log(error.message)

  }
};

const getUser = async (req, res) => {
  try {
    const user=await User.findById(req.params.id)
    const {password,...info}=user._doc 
    res.status(200).json({sucess:true,message:"User has been found",getUser:info})

  } catch (error) {
    res.status(500).json({sucess:false,message:"Unable to get user or user not found"})
    // console.log(error.message)
  }
};

router.put("/update/:id",verifyUser, updateUser);
router.delete("/delete/:id",verifyUser, deleteUser);
router.get("/getuser/:id", getUser);

module.exports = router;
