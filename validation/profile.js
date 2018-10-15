const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.bio = !isEmpty(data.bio) ? data.bio : "";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
