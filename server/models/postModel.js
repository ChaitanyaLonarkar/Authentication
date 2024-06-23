const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    // date: { type: Date, default: Date.now },
    thumbnail: {
      type: String,
      default: "/no_image_available_sm.jpg",
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
