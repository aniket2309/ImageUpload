//Connect Mongodb database

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://aniketsonawane713:JbwWZLZHBbLw9ycX@cluster0.glvmeke.mongodb.net/")
.then(() => {
    console.log("Database Connected")
})
.catch((err) => {
    console.log(err)
})