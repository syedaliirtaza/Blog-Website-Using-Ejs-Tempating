const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.";
const aboutStartingContent = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.";
const contactStartingContent ="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));


let posts = [];


app.get("/",function(req,res){
    console.log("status code for home page:- "+ res.statusCode);
    res.render("home", {startingContent: homeStartingContent,
    posts: posts
    });
})

app.get("/about",function(req,res){
    console.log("status code for about page:- "+ res.statusCode);
    res.render("about", {aboutContent: aboutStartingContent});
})

app.get("/contact",function(req,res){
    console.log("status code for contact page:- "+ res.statusCode);
    res.render("contact", {contactContent: contactStartingContent});
})

app.get("/compose",function(req,res){
    console.log("status code for compose page:- "+ res.statusCode);
    res.render("compose");
})

app.post("/compose", function(req,res){
    console.log("status code for compose page:- "+ res.statusCode);
    var blogTitle = req.body.bloggingTitle;
    var blogContent = req.body.bloggingContent;
    const post = {
        title: blogTitle,
        content: blogContent
    };
    posts.push(post);
    res.redirect("/");
})

app.get("/posts/:postName",function(req,res){
    const requestedTitle = _.lowerCase(req.params.postName);

    posts.forEach(function(post){
        const storedTitle = _.lowerCase(post.title);

        if(requestedTitle === storedTitle){
            res.render("post",{
                title: post.title,
                content: post.content
            })
        }
    });
});

app.listen(3000,function(){
    console.log("server is runnig on port 3000");
})