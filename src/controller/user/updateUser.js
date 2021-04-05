const User = require("../../models/user/model");

async function updateUser(req, res, next) {
  const { id } = req.params;
  const data = req.body;

  try {
    const userExist = await User.exists({ _id: id });
    if (!userExist) throw new Error(next({ status: 404, msg: "User Doesn't exist" }));

    if (!Object.keys(data).length) throw new Error(next({ status: 400, msg: "You have not submitted any data" }));
    if (data.email || data.email === "") {
      await checkIfEmailIsValid(data.email, next);
    }

    const user = await User.findByIdAndUpdate({ _id: id }, { $set: data }, { new: true }).exec();

    if (user) {
      return res.status(200).json(user);
    }
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

module.exports = updateUser;
