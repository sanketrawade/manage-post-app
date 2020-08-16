const express = require("express");
const app = express();
const Post = require("../modals/post");
const mongoose = require("mongoose");
const middleWare = require("../middleware/middleware");

const router = express.Router();

// router.get("/", (req, resp) => {
//   resp.send("<h2>server's home page.</h2>");
// });

router.post("", (req, resp) => {
  let pageSize = req.body.pageSize;
  let currentPage = req.body.currentPage;
  let totalRecords = 0;
  Post.find().count((err, count) => {
    totalRecords = count;
  });
  const query = Post.find();
  if (pageSize && currentPage) {
    query.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  query.then((documents) => {
    resp.status(200).json({ data: documents, count: totalRecords });
    resp.end();
  });
});

router.post("/api/gtpstbyid", middleWare, (req, res) => {
  // let id = req.body.postDetails.id;
  let id = req.body.Id;
  // let post = Post.where(post => post.Id==id);
  Post.findById(id, (err, resp) => {
    let post = resp;
    res.status(200).json({ data: post });
    res.end();
  });
});

router.post("/api/updtpst", middleWare, (req, res) => {
  let post = req.body;
  Post.updateOne({ _id: post._id }, post, (err, resp) => {
    res.status(200).json({ data: post, msg: "post update successfully." });
    res.end();
  });
});

router.post("/api/adpst", middleWare, (req, resp) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save();
  resp.end();
});

router.post("/api/dlpst", middleWare, (req, resp) => {
  const idViewModel = req.body;
  Post.deleteOne({ _id: idViewModel._id }, () => {});
  resp.send().status(200).json({
    messege: "post deleted",
    data: posts,
  });
  resp.end();
});

module.exports = router;
