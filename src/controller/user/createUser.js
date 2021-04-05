const User = require("../../models/user/model");

async function createUser(req, res, next) {
  const { email, givenName, familyName } = req.body;

  try {
    if (!req.body) throw new Error(next({ status: 400, msg: "You have not submitted any data" }));
    await checkIfEmailIsValid(email, next);

    // removed because people have started using numbers in their names
    // const isGivenNameValid = validateString(givenName);
    // const isFamilyNameValid = validateString(familyName);
    // if (!isGivenNameValid || !isFamilyNameValid) throw new Error (next({ status: 400, msg: "Please enter a valid name" }));

    const user = new User({
      email,
      givenName,
      familyName,
    });

    user.save();
    res.status(201).send({ user });
  } catch (err) {
    next(err);
  }
}

async function checkIfEmailIsValid(email, next) {
  if (!email) throw new Error(next({ status: 400, msg: "Please enter a email" }));

  const emailExist = await User.exists({ email });
  if (emailExist) throw new Error(next({ status: 400, msg: "Email Exists - please try user another email" }));

  const isEmailValid = validateEmail(email);
  if (!isEmailValid) throw new Error(next({ status: 400, msg: "Please enter a valid email" }));
}

module.exports = createUser;
