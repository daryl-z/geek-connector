const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  // 防止输入是undefined validator.isEmpty只能对string进行验证
  data.text = !isEmpty(data.text) ? data.text : "";

  if (!validator.isLength(data.text, { min: 1, max: 300 })) {
    errors.text = "帖子字数不能超过300个字";
  }
  if (validator.isEmpty(data.text)) {
    errors.text = "请输入内容";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
