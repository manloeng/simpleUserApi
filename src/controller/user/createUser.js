const User = require("../../models/user/model");
const { checkIfEmailIsValid } = require("../../utils/validator");

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

module.exports = createUser;
