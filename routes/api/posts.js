const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

// Post model
const Post = require("../../models/Post");
// validation
const validatePostInput = require("../../validation/post");
// @route GET api/posts/test
// @desc Tests post route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Posts接口可用" }));

// @route POST api/posts
// @desc 创建Post
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      //如果出错，返回400状态吗和错误对象
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);

// @route GET api/posts
// @desc 获取所有Post
// @access Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ noposts: "没有找到这篇文章" }));
});

// @route GET api/posts/:id
// @desc 按照Post的id获取Post，用作查看详情
// @access Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopost: "没有加载到文章" }));
});

module.exports = router;
