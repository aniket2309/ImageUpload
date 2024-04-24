const express = require("express");
const router = express.Router();
const controller = require("../Controller/controller");
const Auth = require("../Middleware/middleware");


//Postman Routes 8080 Port
router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.post("/uploadImage", controller.uploadImage);
router.get("/getImage",  controller.getImage);


module.exports = router;    

