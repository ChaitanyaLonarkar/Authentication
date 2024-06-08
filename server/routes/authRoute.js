const express = require("express")
const router = express.Router()

const Signup=require("../controller/authcontroller")
const Login=require("../controller/authcontroller")
const Logout=require("../controller/authcontroller")

router.post("/login",Login)
router.post("/logout",Logout)
router.post("/signup",Signup)

module.exports=router