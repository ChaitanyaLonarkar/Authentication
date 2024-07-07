const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    // date: { type: Date, default: Date.now },
    thumbnail: {
      type: String,
      default: "https://firebasestorage.googleapis.com/v0/b/blog-app-32552.appspot.com/o/files%2Fno_image_available_sm.jpg?alt=media&token=7f13cc11-a7f8-4b63-aac4-0e460510e4ef",
    },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    categories: { type: Array},
    userId: { type: String, required: true },
    username:{ type: String, required: true },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Posts", postSchema);

module.exports = Blog;
