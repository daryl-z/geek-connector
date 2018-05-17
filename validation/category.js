const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCateInput(data) {
  let errors = {};
  data.forEach(cate => {
    cate = !isEmpty(cate) ? cate : "";
    if (!validator.isLength(cate, { min: 1, max: 100 })) {
      errors.category = "分类字数只能在1到100之间";
    }
  });

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
