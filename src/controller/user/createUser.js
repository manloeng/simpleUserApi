const { validateEmail } = require("../../utils/validator");

async function createUser(req, res, next) {
  const { email, givenName, familyName } = req.body;
  const emailExist = await User.exists({ email });
  if (!emailExist) next({ status: 400, msg: "Email Exists - please try user another email" });

  const isEmailValid = validateEmail(email);
  if (!isEmailValid) next({ status: 400, msg: "Please enter a valid email" });

  // removed because people have started using numbers in their names
  // const isGivenNameValid = validateString(givenName);
  // const isFamilyNameValid = validateString(familyName);
  // if (!isGivenNameValid || !isFamilyNameValid) next({ status: 400, msg: "Please enter a valid name" });

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
