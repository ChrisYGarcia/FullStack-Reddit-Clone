const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.username, { min: 3, max: 30 })) {
    errors.username = "Name must be between 3 and 30 characters";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Name Field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email Field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password Field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be atleast 6 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirmed Password Field is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
