const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";
  data.title = !isEmpty(data.title) ? data.title : "";

  if (!Validator.isLength(data.title, { min: 5, max: 20 })) {
    errors.title = "Title must be between 5 and 20 characters";
  }

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Body must be between 10 and 300 characters";
  }

  if (Validator.isEmpty(data.title)) {
    errors.text = "Title Field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
