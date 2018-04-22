const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "简介标题需要在2到40个字符之间";
  }
  if (validator.isEmpty(data.handle)) {
    errors.handle = "简介的标题是必须的";
  }

  if (validator.isEmpty(data.status)) {
    errors.status = "工作状态不能为空";
  }
  if (validator.isEmpty(data.skills)) {
    errors.skills = "技能不能为空";
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

  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = "不是一个合法的地址";
    }
  }

  if (!isEmpty(data.leetcode)) {
    if (!validator.isURL(data.leetcode)) {
      errors.leetcode = "不是一个合法的地址";
    }
  }

  if (!isEmpty(data.stackoverflow)) {
    if (!validator.isURL(data.stackoverflow)) {
      errors.stackoverflow = "不是一个合法的地址";
    }
  }

  if (!isEmpty(data.wechat)) {
    if (!validator.isLength(data.wechat, { min: 6, max: 20 })) {
      errors.wechat = "只能是:6—20个字母、数字、下划线和减号,必须以字母开头";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
