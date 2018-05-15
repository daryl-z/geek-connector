const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 创建帖子分类Schema
const CategorySchema = new Schema({
  category: [String]
});

module.exports = Category = mongoose.model("category", CategorySchema);
