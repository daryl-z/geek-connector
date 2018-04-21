const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};
  // 防止输入是undefined validator.isEmpty只能对string进行验证
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "请输入经历标题";
  }
  if (validator.isEmpty(data.company)) {
    errors.company = "请输入公司名称";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "请输入起始日期";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
