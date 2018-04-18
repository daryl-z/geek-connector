const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isEmail(data.email)) {
    errors.email = "请输入合法的邮箱";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "请输入邮箱";
  }
  if (!validator.isLength(data.password, { min: 6, max: 18 })) {
    errors.password = "密码必须在6到18个字符之间";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "请输入密码";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
