require("./DB/connection");
require("dotenv").config();

const express = require("express");
const app = express();
const route = require("./Router/routes");
const multer=require("multer")
const port = process.env.PORT || 8080;
const ejs = require("ejs");
const path = require("path");


app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.use(express.static("public"));
app.use(express.json());
app.use("/user", route);

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./image");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
 const upload = multer({ storage: fileStorageEngine });

app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("File Upload Successful");
});



app.listen(port, () => {
  console.log(`Port Starting At:  ${port}`);
});
