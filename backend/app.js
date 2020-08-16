const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PostRoutes = require("./routes/post");
const UserRoutes = require("./routes/user");

mongoose.connect("mongodb://localhost/StudentDb").then(() => {
});

let posts = [];

app.use(express.json());

app.use((req, resp) => {
  resp.setHeader("Access-Control-Allow-Origin", "*");
  resp.setHeader("Access-Control-Allow-Headers", "*");
  resp.setHeader("Access-Control-Allow-Methods", "*");
  req.next();
});

app.use("/post", PostRoutes);
app.use("/user",UserRoutes);


module.exports = app;
