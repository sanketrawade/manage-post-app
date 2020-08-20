const express = require("express");
const middleWare = require("../middleware/middleware");
const PostController = require("../controllers/post");
const router = express.Router();
const Post = require("../modals/post");

// router.get("/", (req, resp) => {
//   resp.send("<h2>server's home page.</h2>");
// });

router.post("", PostController.GetPostList);

router.post("/api/gtpstbyid", middleWare, PostController.GetPostById);

router.post("/api/updtpst", middleWare, PostController.UpdatePost);

router.post("/api/adpst", middleWare, PostController.AddPost);

router.post("/api/dlpst", PostController.DeletePost);

module.exports = router;
