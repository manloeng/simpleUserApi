function validateEmail(email) {
  const emailRegexCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gm;
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

module.exports = { validateEmail, validateString };
