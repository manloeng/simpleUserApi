const User = require("../models/user/model");

async function checkIfEmailIsValid(email, next) {
  if (!email) throw new Error(next({ status: 400, msg: "Please enter a email" }));

  const emailExist = await User.exists({ email });
  if (emailExist) throw new Error(next({ status: 400, msg: "Email Exists - please try user another email" }));

  const isEmailValid = validateEmail(email);
  if (!isEmailValid) throw new Error(next({ status: 400, msg: "Please enter a valid email" }));
}

function validateEmail(email) {
  const emailRegexCheck = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/gm;
  const isEmailValid = emailRegexCheck.test(email);

  return isEmailValid;
}

function validateString(string) {
  const stringRegex = /\w+/g;
  const matchString = string.match(stringRegex);

  const newString = matchString.join("");
  const isStringValid = string.length === newString.length;
  return isStringValid;
}

module.exports = { checkIfEmailIsValid, validateEmail, validateString };
