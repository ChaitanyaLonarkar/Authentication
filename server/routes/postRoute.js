const express = require("express");
const router = express.Router();

const Blog = require("../models/postModel.js");
const verifyUser=require("../verify/verifyUser.js")
const Comments = require("../models/commentModel.js");

// CREATE ONE BLOG

const createPost = async (req, res) => {
  try {
    // const { title, content, category, thumbnail } = req.body();
    console.log(req.body,"gfgdfgsdfsdfsd")
    const createdPost = await Blog.create(req.body);
    res.status(200).json({
      sucess: true,
      message: "Blog posted Succesfully",
      post: createdPost,
    });
  } catch (error) {
    res.status(500).json({ sucess: false, message: "Blog Title and Description should not empty" });
    console.log(error)
  }
};
// UPDATE ONE BLOG

const updatePost = async (req, res) => {
  try {
    // const { title, content, category, thumbnail } = req.body();
    const updatedPost = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      sucess: true,
      message: "Blog updated Succesfully",
      post: updatedPost,
    });
  } catch (error) {
    res.status(500).json({ sucess: false, message: "Blog update error" });
  }
};


// DELET ONE BLOG
const deletePost = async (req, res) => {
  try {
    // const { title, content, category, thumbnail } = req.body();
    await Blog.findByIdAndDelete(req.params.id);
    await Comments.deleteMany({postId:req.params.id})
    res.status(200).json({ sucess: true, message: "Blog deleted Succesfully" });
  } catch (error) {
    res.status(500).json({ sucess: false, message: "Blog delete error" });
    console.log(error.message)
  }
};
// GET ALL BLOGS

const getAllPosts = async (req, res) => {
  try {
    const query = req.query;
    if (query.search) {
      const searchFilter = {
        title: { $regex: query.search, $options: "i" },
      };
      const posts = await Blog.find(searchFilter);
      res.status(200).json(posts);
    } else {
      const allblogs = await Blog.find();
      res.status(200).json({
        sucess: true,
        message: "get all Blog Succesfully",
        allblogs: allblogs,
      });
    }
  } catch (error) {
    res.status(500).json({ sucess: false, message: "Blogs nahi hai" });
  }
};
// GET search ALL BLOGS

const getSearchPosts = async (req, res) => {
  try {
    const query = req.query;
      const searchFilter = {
        // title: { $regex: query.search, $options: "i" },
        $or: [
          { title: { $regex: query.search, $options: "i" } },
          { categories: { $elemMatch: { $regex: query.search, $options: "i" } } }
        ]
      };
      const posts = await Blog.find(searchFilter);
      res.status(200).json({posts:posts,message:"DSRSDFS"});
   
  } catch (error) {
    res.status(500).json({ sucess: false, message: "Blogs nahi hai" });
    console.log(error.message)
  }
};

// GET POST OF USER
const getOnePostOfUser = async (req, res) => {
  try {
    // const { title, content, category, thumbnail } = req.body();
    const oneBlogOfUser = await Blog.find({ userId: req.params.id });
    res.status(200).json({
      sucess: true,
      message: "get Blog Succesfully",
      oneBlogOfUser: oneBlogOfUser,
    });
  } catch (error) {
    res.status(500).json({ sucess: false, message: "Blog nahi hai is id se" });
  }
};

// GET ONE POST BY POST ID
const getOnePost = async (req, res) => {
  try {
    // const { title, content, category, thumbnail } = req.body();
    const oneBlog = await Blog.findById(req.params.id);
    res.status(200).json({
      sucess: true,
      message: "get Blog Succesfully",
      oneBlog: oneBlog,
    });
  } catch (error) {
    res.status(500).json({ sucess: false, message: "Blog nahi hai is id se" });
  }
};

router.post("/create",verifyUser, createPost);
router.put("/update/:id",verifyUser, updatePost);
router.delete("/delete/:id",verifyUser, deletePost);
router.get("/getAllPosts", getAllPosts);
router.get("/getSearchPosts", getSearchPosts);

router.get("/getpostofuser/:id", getOnePostOfUser);
router.get("/getpost/:id", getOnePost);

module.exports = router;
