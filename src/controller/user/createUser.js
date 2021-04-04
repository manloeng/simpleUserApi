const validateEmail = require("../../utils/emailValidator");

async function createUser(req, res, next) {
  const { email, givenName, familyName } = req.body;
  const emailExist = await User.exists({ email });
  if (!emailExist) next({ status: 400, msg: "Email Exists - please try user another email" });

  const isEmailValid = validateEmail(email);
  if (!isEmailValid) next({ status: 400, msg: "Please enter a valid email" });

  try {
    const user = new User({
      email,
      givenName,
      familyName,
    });

    res.send({ user });
  } catch (e) {
    console.log(e);
  }
}

module.exports = createUser;
