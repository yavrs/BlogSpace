
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    posttitle: String,
    postdata: String,

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }]
});

module.exports = mongoose.model("post", postSchema);