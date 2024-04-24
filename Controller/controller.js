const userInfo = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const console = require("console");
var Secret = "Aniket";
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
}).single("image");



// Signup
const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    let salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(password, salt);
    req.body.password = hashPassword;
    const userAdding = new userInfo(req.body)
    await userAdding
      .save()
      .then((data) => {
        res.status(200).json({ message: "User added successfully" });
      }
      )
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

//Login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    let user = await userInfo.findOne({ email: email });

    if (user) {
      let check = await bcrypt.compare(password, user.password);
      console.log(check);
      if (check) {

        let token = jwt.sign({ userId: user._id }, process.env.Secret, {
          expiresIn: "20m",
        });
        res.json({
          message: "SignIn successfully",
          "token valid for 20 min": "token",
          token: token,
        });
      } else {
        res.send("Enter valid email and password");
      }
    } else {
      res.send("User not found");
    }
  } else {
    res.send("Please enter valid email and password");
  }
};

//create a API for the upload the image on cloudinary and store the image in the database
const uploadImage = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.send(err);
    }
    else {
      if (req.file === undefined) {
        res.send("Please select an image to upload");
      }
      else {
        const image = req.file.filename;
        const user = await userInfo.findById(req.params.id);
        user.image = image;
        await user.save();
        res.send("Image uploaded successfully");
      }
    }
  }
  );
}

//Create a API for the get the image from the database  
const getImage = async (req, res) => {
  const user = await userInfo.findById(req.params.id);
  res.send(user.image);
} 

//Modules
module.exports = {
  signup,
  login,
  uploadImage,
  getImage
};