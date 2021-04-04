const User = require("../../models/user/model");
const { validateEmail } = require("../../utils/validator");

async function createUser(req, res, next) {
  const { email, givenName, familyName } = req.body;

  try {
    const emailExist = await User.exists({ email });
    if (emailExist) throw new Error(next({ status: 400, msg: "Email Exists - please try user another email" }));

    const isEmailValid = validateEmail(email);
    if (!isEmailValid) throw new Error(next({ status: 400, msg: "Please enter a valid email" }));

    // removed because people have started using numbers in their names
    // const isGivenNameValid = validateString(givenName);
    // const isFamilyNameValid = validateString(familyName);
    // if (!isGivenNameValid || !isFamilyNameValid) next({ status: 400, msg: "Please enter a valid name" });

    const user = new User({
      email,
      givenName,
      familyName,
    });

    user.save();
    res.send({ user });
  } catch (err) {
    next(err);
  }
}

module.exports = createUser;
