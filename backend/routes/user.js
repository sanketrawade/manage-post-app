const express = require("express");
const mongoose = require("mongoose");
const User = require("../modals/user");
const jwt = require("jsonwebtoken");
const userController = require("../controllers/user");
const router = express.Router();

router.post("/api/regusr",userController.createUser)

router.post("/api/lgnusr",userController.userLogin)

module.exports = router;
