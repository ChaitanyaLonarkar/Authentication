const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    // date: { type: Date, default: Date.now },
    comment: { type: String, required: true },
    authorId: { type: String, required: true },
    userId: { type: String, required: true },
    postId:{ type: String, required: true },
  },
  { timestamps: true }
);

const Comments = mongoose.model("Comment", commentSchema);

module.exports = Comments;
