const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCateInput(data) {
  let errors = {};
  data.category = !isEmpty(data.category) ? data.category : "";

  if (!validator.isLength(data.category, { min: 1, max: 20 })) {
    errors.category = "分类字数只能在1到20之间";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
