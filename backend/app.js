const express = require("express");
const { nextTick } = require("process");
const app = express();
const Post = require("./modals/post");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/StudentDb").then(() => {
  console.log("db connected");
});

let posts = [];

app.use(express.json());

app.use((req, resp) => {
  resp.setHeader("Access-Control-Allow-Origin", "*");
  resp.setHeader("Access-Control-Allow-Headers", "*");
  resp.setHeader("Access-Control-Allow-Methods", "*");
  req.next();
});

app.get("/", (req, resp) => {
  resp.send("<h2>server's home page.</h2>");
});

app.get("/api/gtpst", (req, resp) => {
  Post.find().then((documents) => {
    let response = {
      messege: "post list.",
      posts: documents,
    };
    resp.status(200).json(response);
    resp.end();
  });
});

app.post("/api/adpst", (req, resp) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save();
  resp.end();
});

app.post("/api/dlpst", (req, resp) => {
  const idViewModel = req.body;
  Post.deleteOne({ _id: idViewModel._id }, () => {});
  resp.send().status(200).json({
    messege: "post deleted",
    data: posts,
  });
  resp.end();
});

module.exports = app;
