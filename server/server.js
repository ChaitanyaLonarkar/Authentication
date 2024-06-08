const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
var jwt = require("jsonwebtoken");
const cors = require("cors");
// const isUserLoggedIn = require("./middleware/isLoggedin.js");


require('dotenv').config()

// const connectDb = require("./DB/connection.js");
// const router = express.Router();
// const authRouter = require("./routes/authRoute.js");

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("heelos")
})

app.listen(process.env.PORT, () => {
    // connectDb();
    console.log(`working on`,process.env.PORT);
    });