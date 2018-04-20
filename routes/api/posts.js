const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

// Post model
const Post = require("../../models/Post");
// Profile model
const Profile = require("../../models/Profile");
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
  let error = { noposts: "没有加载到任何帖子" };
  Post.find()
    .then(posts => {
      if (posts.length === 0) {
        return res.status(404).json(errors);
      }
      posts
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json(errors));
    })
    .catch(err => res.status(404).json(errors));
});

// @route GET api/posts/:id
// @desc 按照Post的id获取Post，用作查看详情
// @access Public
router.get("/:id", (req, res) => {
  let errors = { nopost: "没有找到这篇帖子" };
  Post.findById(req.params.id)
    .then(post => {
      if (post === null) {
        return res.status(404).json(errors);
      }
      post
        .sort({ date: -1 })
        .then(post => res.json(post))
        .catch(err => res.status(404).json(errors));
    })
    .catch(err => res.status(404).json(errors));
});

// @route Delete api/posts/:id
// @desc 删除post
// @access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthrized: "当前用户没有删除其他用户帖子的权限！！" });
          }

          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "没有找到帖子" }));
    });
  }
);

module.exports = router;
