const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 创建Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String,
    require: true
  },
  text: {
    type: String
  },
  name: {
    type: String
  },
  category: {
    type: String,
    default: "其它"
  },
  tags: {
    type: [String]
    // required: true
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  unlikes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user"
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
