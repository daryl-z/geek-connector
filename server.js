const express = require("express");
const mongoose = require("mongoose");
const app = express();

//  数据库配置
const db = require("./config/keys").mongoURI;

// 链接到mongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// 首页路由
app.get("/", (req, res) => res.send("Hello dfd"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Ruing On Port ${port}...`));
