const express = require('express');
const app = express()
const path = require('path');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const userModel = require('./models/userModel');
const postModel = require('./models/postModel');

// Middleware to parse HTML form data
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data
app.use(express.json());

// Set EJS as the view engine
app.set("view engine", "ejs");

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());




// Home route
app.get('/', async (req, res) => {
    let posts = await postModel.find().populate("user")

    res.render("home", { posts })
});

app.post("/create", async (req, res) => {
    let { name, username, password, email } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({
                username,
                name,
                email,
                password: hash
            });

        })

        res.redirect("/login")
    })

})



app.get("/register", (req, res) => {
    res.render("register")


})

// Show login page if user is not logged in
app.get("/login", (req, res) => {
    const token = req.cookies.token;

    if (token) {
        try {
            jwt.verify(token, "shhhh");
            return res.redirect("/profile");
        } catch (err) {
            res.clearCookie("token");
        }
    }

    res.render("login");
});

app.post("/login", async (req, res) => {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email })

    if (!user) return res.send("something went wrong 1")

    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {

            //token create
            const token = jwt.sign({ userId: user._id }, "shhhh");

            //cookie set
            res.cookie("token", token)

            //profile pe bhej do
            return res.redirect("/profile")

        } else {
            res.send("something went wrong 2")
        }

    })

})




app.get("/profile", isloggedIn, async (req, res) => {
    try {
        const user = await userModel
            .findById(req.user.userId)
            .populate("posts");

        if (!user) {
            res.clearCookie("token");
            return res.redirect("/login");
        }

        res.render("profile", {  user,
            user_id: req.user.userId });

    } catch (err) {
        console.log(err);
        res.status(500).send("Unable to load profile");
    }
});


//logout fucntion

app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
});



// for creating the posts
app.post("/submit", isloggedIn, async function (req, res) {
    let { title, content } = req.body
    const user = await userModel.findById(req.user.userId)
    let post = await postModel.create({
        user: req.user.userId,
        posttitle: title,
        postdata: content
    })

    user.posts.push(post._id)
    await user.save()
    res.redirect("/profile")




})





function isloggedIn(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/login");
    }

    try {
        const data = jwt.verify(token, "shhhh");
        req.user = data;
        next();
    } catch (err) {
        res.clearCookie("token");
        return res.redirect("/login");
    }
}


// for editing the post

app.get("/edit/:editID", async (req, res) => {
    let post = await postModel.findById(req.params.editID)
    res.render("edit", { post })
})

// for updating edit post in db

app.post("/edit/:editID", async (req, res) => {

    let { newTitle, newContent } = req.body

    const post = await postModel.findByIdAndUpdate(
        req.params.editID,
        {
            posttitle: newTitle,
            postdata: newContent
        },
        { new: true }
    );

    res.redirect("/profile")
})

// for likes
app.post("/like/:postID", isloggedIn, async (req, res) => {

    let post = await postModel.findById(req.params.postID).populate("user")
    if (post.likes.indexOf(req.user.userId) == -1) {
        post.likes.push(req.user.userId)

    } else {
        post.likes.splice(post.likes.indexOf(req.user.userId), 1)

    }
    await post.save();
    res.redirect("/profile")
})



app.listen(3000)
