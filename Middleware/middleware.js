const jwt = require("jsonwebtoken");

const userinfo = require("../Models/user");
require("dotenv").config();

//Check Jsonwebtoken
const checkAuth = async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const {userId} = jwt.verify(token, process.env.Secret);
      
      if (userId) {
        req.user = userId;
        next();
      } else {
        res.status(401).json({
          message: "UnAuthorized User",
        });
      }
    } catch (error) {
      res.status(401).json({
        message: "UnAuthorized User",
      });
      throw error;
    }
  };
  
  //Admin Access
  const AdminAuth = async (req, res, next) => {
    try {
      var userId = req.user;
      console.log(userId)
      await userinfo.findOne({_id:userId}).then((data) => {
        console.log(data)
        if (data.role == "admin" || data.role == "Admin") {
          next();
        } else {
          res.status(401).json({ message: "Admin Role required" });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        message: "No Access",
      });
    }
  };
  
  module.exports = { checkAuth, AdminAuth };