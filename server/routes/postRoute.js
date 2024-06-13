const express = require("express");
const router = express.Router();

const Blog = require("../models/postModel.js");

const createPost = async (req, res) => {
  try {
    const { title, content, category, templatePic } = req.body();

    if (title || content || category || templatePic ==""){
        return res.status(400).json({ message: "All fields are required" });
    }
    const createdPost = await Blog.create({ title, content, category, templatePic });

  } catch (error) {}
};
