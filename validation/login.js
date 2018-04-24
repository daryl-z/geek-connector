const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  // 防止输入是undefined validator.isEmpty只能对string进行验证
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isEmail(data.email)) {
    errors.email = "请输入合法的邮箱";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "请输入邮箱";
  }
  if (!validator.isLength(data.password, { min: 8, max: 16 })) {
    errors.password = "密码必须在8到16个字符之间";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "请输入密码";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
