const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    date: { type: Date, default: Date.now },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    templatePic: {
      type: String,
      default: "",
    },
  }
  { timestamps: true }
);

const Blog = mongoose.model("Posts", postSchema);

module.exports = Blog;
