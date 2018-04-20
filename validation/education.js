const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput(data) {
  let errors = {};
  // 防止输入是undefined validator.isEmpty只能对string进行验证
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.school)) {
    errors.school = "请输入学校名称";
  }
  if (validator.isEmpty(data.degree)) {
    errors.degree = "学位是必填项";
  }
  if (validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "请输入专业名称";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "请输入起始日期";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
