const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const nodemailer = require("nodemailer");

// 登录注册输入验证
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");

// @route GET api/users/test
// @desc Tests pusers route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route GET api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // 验证是否有错误
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "该邮箱已注册";
      return res.status(400).json({ errors });
    }
    const avatar = gravatar.url(req.body.email, {
      s: "200", // Size
      r: "pg", // rating
      d: "mm" // Default
    });
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      avatar,
      password: req.body.password
    });
    // 发送验证邮件
    // const transporter = nodemailer.createTransport({
    //   host: "smtp.163.com",
    //   port: 465,
    //   secureConnection: true,
    //   auth: {
    //     user: "angelks4@163.com",
    //     pass: "Angelks4"
    //   }
    // });

    // const messageOption = {
    //   from: "angelks4@163.com", // sender address
    //   to: "563017963@qq.com", // list of receivers
    //   subject: "测试邮件", // Subject line
    //   text: "Nodejs之邮件发送", // plaintext body
    //   html:
    //     "<h2>欢迎关注我的GitHub，一起学习Nodejs。https://github.com/Angelki</h2>"
    // };

    // transporter.sendMail(messageOption, function(error, info) {
    //   if (!error) {
    //     return res.json({ message: "邮件发送成功，请注意查收！" });
    //   } else {
    //     console.log(error);
    //     return res.json({ message: "邮件发送失败，请稍后重试！" });
    //   }
    // });
    // // verify connection configuration
    // transporter.verify(function(error, success) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log("Server is ready to take our messages");
    //   }
    // });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          throw err;
        }
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
});

// @route GET api/users/login
// @desc Login User /Returning JWT Token
// @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // 验证是否有错误
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // 通过email在数据库中寻找用户
  User.findOne({ email }).then(user => {
    // 如果用户不存在
    if (!user) {
      errors.email = "用户不存在";
      return res.status(404).json(errors);
    }
    // 验证密码
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // res.json({ msg: "Success" });
        // User Matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // 创建jwt payload
        // sign Token
        jwt.sign(
          payload,
          keys.secretOrPrivateKey,
          { expiresIn: 36000 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "密码不正确";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route GET api/users/current
// @desc return current user
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
