const Post = require("../modals/post");

exports.GetPostList = (req, resp) => {
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
};

exports.GetPostById = (req, res) => {
  let id = req.body.Id;
  console.log(id);
  Post.findById(id, (err, resp) => {
    let post = resp;
    res.status(200).json({ data: post });
    res.end();
  });
};

exports.UpdatePost = (req, res) => {
  let post = req.body;
  Post.updateOne({ _id: post._id }, post, (err, resp) => {
    res.status(200).json({ data: post, msg: "post update successfully." });
    res.end();
  });
};

exports.DeletePost = (req, resp) => {
  const idViewModel = req.body;
  console.log(idViewModel);
  Post.deleteOne({ _id: idViewModel._id }, (err, res) => {
    if (err != null) {
      console.log(err);
    }
    resp.status(200).json({ msg: "deleted successfully" });
    resp.end();
  });
};

exports.AddPost = (req, resp) => {
  console.log(req.body);
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    creator: req.body.creator,
  });
  post
    .save()
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
