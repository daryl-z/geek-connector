const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "handle needs to between 2 and 4 characters";
  }
  if (!validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }

  if (!validator.isEmpty(data.status)) {
    errors.status = "Status field is required";
  }
  if (!validator.isEmpty(data.skills)) {
    errors.skills = "skills field is required";
  }
  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = "不是一个合法的地址";
    }
  }

  if (!isEmpty(data.bili)) {
    if (!validator.isURL(data.bili)) {
      errors.bili = "不是一个合法的地址";
    }
  }
  if (!isEmpty(data.weibo)) {
    if (!validator.isURL(data.weibo)) {
      errors.weibo = "不是一个合法的地址";
    }
  }
  if (!isEmpty(data.qq)) {
    if (!validator.isInt(data.qq, { min: 1, max: 15 })) {
      errors.qq = "不是一个合法QQ号";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
