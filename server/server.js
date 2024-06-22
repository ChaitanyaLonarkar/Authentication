const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const multer=require('multer')
const path=require("path")
var jwt = require("jsonwebtoken");
const PORT=process.env.PORT||8000
const cors = require("cors");
const corsOptions = {
  // origin: "http://localhost:5173", // Allow this origin
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

app.use(cookieParser());
app.use(express.json());
app.use("/", authRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use("/public/Images",express.static(path.join(__dirname,"/public/Images")))


// app.get("/",(req,res)=>{
//     res.send("heelos")
// })

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, "./public/Images")
  },
  filename: function (req, file, cb) {
    // return cb(null, `${Date.now()}_${file.originalname}`)
    return cb(null,req.body.img)

  }
})

const upload = multer({storage})

app.post('/image/upload', upload.single('file'), (req, res) => {
  console.log(req.body)
  // console.log(req.file)
  res.status(200).json("Image has been uploaded successfully!")
})

app.listen(PORT, () => {
  connectDb();
  console.log(`working on`,PORT );
});
