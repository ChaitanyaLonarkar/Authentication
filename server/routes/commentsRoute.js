const express = require("express");
const router = express.Router();

// const Blog = require("../models/postModel.js");
// const User = require("../models/userModel.js");
const Comments = require("../models/commentModel.js");




// CREATE ONE Comment

const createComment = async (req, res) => {
  try {
    // const { title, content, category, thumbnail } = req.body();
    const createdComment = await Comments.create(req.body);
    res.status(200).json({sucess:true,message:"Comment Succesfully",comment:createdComment})


  } catch (error) {
    res.status(500).json({sucess:false,message:"comment error"})

  }
};
// UPDATE Comment

const updateComment = async (req, res) => {
  try {
    // const { title, content, category, thumbnail } = req.body();
    const updatedComment = await Comments.findByIdAndUpdate(req.params.id,{ $set:req.body },
      { new: true });
    res.status(200).json({sucess:true,message:"Comment update Succesfully",comment:updatedComment})


  } catch (error) {
    res.status(500).json({sucess:false,message:"Comment update error"})

  }
};
// DELET Comment
const deleteComment = async (req, res) => {
  try {
    // const { title, content, category, thumbnail } = req.body();
    await Comments.findByIdAndDelete(req.params.id);
    res.status(200).json({sucess:true,message:"Comment deleted Succesfully"})


  } catch (error) {
    res.status(500).json({sucess:false,message:"Comment delete error"})

  }
};
//GET POST COMMENTS
const getPostComment=async (req,res)=>{
    try{
        const comments=await Comments.find({postId:req.params.postId})
        res.status(200).json(comments)
    }
    catch(err){
        res.status(500).json(err)
    }
}

router.post("/create", createComment);
router.put("/update/:id", updateComment);
router.delete("/delete/:id", deleteComment);
router.get("/post/:postId", getPostComment);



module.exports = router;