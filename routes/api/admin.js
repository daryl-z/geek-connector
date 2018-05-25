const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const nodemailer = require("nodemailer");
const validateCateInput = require("../../validation/category");
// Load User model
const Category = require("../../models/Category");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

router.get("/test", (req, res) => res.json({ msg: "admin Works" }));

// category
// @route get api/admin/category
// @desc 获取分类
// @access Public
router.get("/category", (req, res) => {
  let errors = { nocates: "没有加载到任何分类" };
  Category.find()
    .then(cates => {
      if (cates.length === 0) {
        return res.status(404).json(errors);
      }
      res.json(cates);
    })
    .catch(err => res.status(404).json(errors));
});

// @route POST api/admin/edit-category
// @desc 修改分类
// @access Private
router.post("/edit-category", (req, res) => {
  const { errors, isValid } = validateCateInput(req.body);
  if (!isValid) {
    //如果出错，返回400状态吗和错误对象
    return res.status(400).json(errors);
  }

  const newCate = [...req.body];

  Category.findByIdAndUpdate(
    "5afa97d41861323648086e51",
    { category: newCate },
    { new: true }
  )
    .then(cate => res.json(cate))
    .catch(err => res.status(404).json(err));
  // newCate.save().then(cate => res.json(cate));
});

//comments

// post

// user
// @route E api/profile
// @desc 删除用户的所有信息
// @access Private
router.delete(
  "/user/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.params.user_id })
      .then(() => {
        User.findOneAndRemove({ _id: req.params.user_id })
          .then(() => res.json({ success: true }))
          .catch(err => res.status(404).json(err));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route Delete api/posts/:id
// @desc 删除post
// @access Private
router.delete(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Model.prototype.remove() 从数据库移除当前文档
        post.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ postnotfound: "没有找到帖子" }));
  }
);

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

module.exports = router;
