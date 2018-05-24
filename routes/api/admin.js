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
module.exports = router;
