const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
var jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");

const corsOptions = {
  // origin: ["https://perfect-blogs.netlify.app/","http://localhost:5173/"] ,// Allow this origin
  // origin: "http://localhost:5173", // Allow this origin
   origin: "https://perfect-blogs.netlify.app",
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
require("dotenv").config();

const connectDb = require("./Db/connection.js");
// const router = express.Router();
const authRouter = require("./routes/authRoute.js");
const userRouter = require("./routes/userRoute.js");
const postRouter = require("./routes/postRoute.js");
const commentRouter = require("./routes/commentsRoute.js");
const uploadImagerouter=require("./routes/uploadImage.js")

app.use(cookieParser());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use("/image/upload",uploadImagerouter)
app.use(
  "/public/Images",
  express.static(path.join(__dirname, "/public/Images"))
);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  connectDb();
  console.log(`working on`, PORT);
});
