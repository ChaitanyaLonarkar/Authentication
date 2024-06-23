const jwt = require("jsonwebtoken");


const verifyUser = (req, res, next) => {
    try {
      const token = req.cookies.token;
  
      if (!token) {
        return res.json({
          sucess: false,
          message: "Unauthorize - no token provided or you need to login",
        });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      if (!decoded) {
        return res.json({
          sucess: false,
          message: "Unauthorize - invalid token ",
        });
      }
  
      // console.log(req.user,"from protect")
      next();
    } catch (error) {
      console.log("Error in protectRoute controller", error.message);
      res.json({ error: "Internal Server Error" });
    }
  };

  module.exports=verifyUser