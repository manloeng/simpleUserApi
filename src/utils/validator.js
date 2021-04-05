function validateEmail(email) {
  const emailRegexCheck = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/gm;
  const isEmailValid = emailRegexCheck.test(email);

  return isEmailValid;
}

// function validateString(string) {
//   const stringRegex = /\w+/g;
//   const matchString = string.match(stringRegex);

//   const newString = matchString.join("");
//   const isStringValid = string.length === newString.length;
//   return isStringValid;
// }

module.exports = { validateEmail };
