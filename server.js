const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//  数据库配置
const db = require("./config/keys").mongoURI;

// 链接到mongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// 首页路由
// app.get("/", (req, res) => res.send("Hello dfd"));
// passport 中间件
app.use(passport.initialize());

// Passport Config 引入并传参调用config/passport模块导出的函数
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Ruing On Port ${port}...`));
