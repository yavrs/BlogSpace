const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/blogpost")

const userSchema = mongoose.Schema({
    name: String,
    username: String,
    password:String,
    email: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    }]
})


module.exports = mongoose.model("user", userSchema)