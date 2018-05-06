const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  // 防止输入是undefined validator.isEmpty只能对string进行验证
  data.text = !isEmpty(data.text) ? data.text : "";

  if (!validator.isLength(data.text, { min: 0, max: 3000000 })) {
    errors.text = "帖子字数不能超过3000000个字";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
