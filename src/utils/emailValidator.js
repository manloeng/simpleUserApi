function validateEmail(email) {
  const emailRegexCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gm;
  const isEmailValid = emailRegexCheck.test(email);

  return isEmailValid;
}

module.exports = validateEmail;
