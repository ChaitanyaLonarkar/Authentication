const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
var jwt = require("jsonwebtoken");
// const isUserLoggedIn = require("./middleware/isLoggedin.js");

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:5173", // Allow this origin
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

// app.get("/",(req,res)=>{
//     res.send("heelos")
// })

app.listen(process.env.PORT, () => {
  connectDb();
  console.log(`working on`, process.env.PORT);
});
