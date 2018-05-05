const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
var multer = require("multer");

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
      user: req.user.id,
      catagory: req.body.catagory
    });
    newPost.save().then(post => res.json(post));
  }
);

// @route GET api/posts
// @desc 获取所有Post
// @access Public
router.get("/", (req, res) => {
  let errors = { noposts: "没有加载到任何帖子" };
  //sort方法是mongoose Query.prototype.sort -1表示降序
  Post.find()
    .sort({ date: -1 })
    .then(posts => {
      if (posts.length === 0) {
        return res.status(404).json(errors);
      }
      res.json(posts);
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
      res.json(post);
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
          // Model.prototype.remove() 从数据库移除当前文档
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "没有找到帖子" }));
    });
  }
);

// @route POST  api/posts/like/:id
// @desc 喜欢某帖子
// @access Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // 如果当前用户在点赞数组中已经存在(筛选之后数组长度大于0) 则取消点赞
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            // 获取想要移除的下标
            const index = post.likes
              .map(item => item.user.toString())
              .indexOf(req.user.id);
            if (index > -1) {
              post.likes.splice(index, 1);
              return post.save().then(post => res.json(post));
            }
          }
          // 如果当前用户在踩数组中 则取消踩 然后赞
          if (
            post.unlikes.filter(
              unlike => unlike.user.toString() === req.user.id
            ).length > 0
          ) {
            const index = post.unlikes
              .map(item => item.user.toString())
              .indexOf(req.user.id);
            if (index > -1) {
              post.unlikes.splice(index, 1);
              post.likes.unshift({ user: req.user.id });
              return post.save().then(post => res.json(post));
            }
          }
          // 如果都不在 则将用户id添加进likes数组
          post.likes.unshift({ user: req.user.id });
          post.save().then(post => res.json(post));
        })
        .catch(err =>
          res
            .status(404)
            .json({ postnotfound: "没有找到该帖子！请尝试刷新页面" })
        );
    });
  }
);

// @route POST  api/posts/unlike/:id
// @desc 取消喜欢某帖子
// @access Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // 如果当前用户已赞 则取消点赞 改为踩
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            const index = post.likes
              .map(item => item.user.toString())
              .indexOf(req.user.id);
            if (index > -1) {
              post.likes.splice(index, 1);
              post.unlikes.unshift({ user: req.user.id });
              return post.save().then(post => res.json(post));
            }
          }
          // 如果已经踩了 则取消
          if (
            post.unlikes.filter(
              unlike => unlike.user.toString() === req.user.id
            ).length > 0
          ) {
            const index = post.unlikes
              .map(item => item.user.toString())
              .indexOf(req.user.id);
            if (index > -1) {
              post.unlikes.splice(index, 1);
              return post.save().then(post => res.json(post));
            }
          }

          // 如果又没赞又没踩 则踩
          post.unlikes.unshift({ user: req.user.id });
          post.save().then(post => res.json(post));
        })
        .catch(err =>
          res
            .status(404)
            .json({ postnotfound: "没有找到该帖子！请尝试刷新页面" })
        );
    });
  }
);

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        // Add to comments array
        post.comments.unshift(newComment);

        // Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // 检查评论是否存在 如果不存在就404
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "要删除的评论不存在" });
        }

        // 获取下标
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // 移除评论
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "没找到帖子" }));
  }
);

// @route   DELETE api/posts/upload
// @desc    Add image from local
// @access  Private
const Storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "/public/images");
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

let upload = multer({ storage: Storage }).array("imgUploader", 3); //Field name and max count

router.post("/api/upload", function(req, res) {
  upload(req, res, function(err) {
    if (err) {
      return res.end("Something went wrong!");
    }
    return res.end("File uploaded sucessfully!.");
  });
});

module.exports = router;
