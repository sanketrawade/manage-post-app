const express = require("express");
const mongoose = require("mongoose");
const User = require("../modals/user");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/api/regusr", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  user
    .save()
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/api/lgnusr", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  User.findOne({ username: username, password: password }).then((user) => {
    if (!user) {
      return res.status(401).json({ msg: "auth failed." });
    }
    const token = jwt.sign(
      { username, userId: user._id },
      "secret_this_is_sas_sasas",
      { expiresIn: "2m" }
    );
    res.status(200).json({
      data: user._id,
      msg: "login success.",
      token: token,
      expiredIn: 120,
    });
  });
});

module.exports = router;
