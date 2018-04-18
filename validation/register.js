const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateReigsterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  console.log(typeof data.name);
  if (!validator.isLength(data.name, { min: 2, max: 18 })) {
    errors.name = "用户名长度必须在2至18个字符之间";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "用户名不能为空";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "请输入合法的邮箱";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "邮箱不能为空";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "请输入密码";
  }
  if (!validator.isLength(data.password, { min: 6, max: 18 })) {
    errors.password = "密码必须在6到18个字符之间";
  }
  if (validator.isEmpty(data.password2)) {
    errors.password2 = "确认密码不能为空";
  }
  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "两次输入的密码不匹配";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
