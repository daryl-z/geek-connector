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
      return res.status(400).json(errors);
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

    // // 发送验证邮件
    // const transporter = nodemailer.createTransport({
    //   host: "smtp.qq.com",
    //   port: 465,
    //   auth: {
    //     user: "563017963@qq.com",
    //     pass: "hsgzygtxqbzsbdfh"
    //   }
    // });

    // const messageOption = {
    //   from: "devPlayer论坛 563017963@qq.com", // sender address
    //   to: newUser.email, // list of receivers
    //   subject: "注册成功！请验证您的邮箱。", // Subject line
    //   text: "注册成功！请验证您的邮箱。", //
    //   html: `<h1>您收到这封邮件，是由于在 Dev Player 进行了新用户注册，或用户修改 Email 使用了这个邮箱地址。如果您并没有访问过该网站，或没有进行上述操作，请忽略这封邮件。您不需要退订或进行其他进一步的操作。注册成功，点击下方链接，验证邮箱：</h1>`
    // };

    // transporter.sendMail(messageOption, function(error, info) {
    //   if (!error) {
    //     return res.json({ message: "邮件发送成功，请注意查收！" });
    //   } else {
    //     console.log(error);
    //     return res.json({ message: "邮件发送失败，请稍后重试！" });
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

// router.get("/verify", (req, res) => {
//   console.log(req.protocol + ":/" + req.get("host"));
//   if (req.protocol + "://" + req.get("host") == "http://" + host) {
//     console.log("Domain is matched. Information is from Authentic email");
//     if (req.query.id === rand) {
//       console.log("email is verified");
//       res.end("<h1>Email " + mailOptions.to + " is been Successfully verified");
//     } else {
//       console.log("email is not verified");
//       res.end("<h1>Bad Request</h1>");
//     }
//   } else {
//     res.end("<h1>Request is from unknown source");
//   }
// });

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
