const User = require("../../models/user/model");

async function updateUser(req, res, next) {
  const { id } = req.params;
  const data = req.body;

  try {
    const userExist = await User.exists({ _id: id });
    if (!userExist) throw new Error(next({ status: 400, msg: "User Doesn't exist" }));

    if (!data) throw new Error(next({ status: 400, msg: "You have not submitted any data" }));

    const user = await User.findByIdAndUpdate({ _id: id }, { $set: data }, { new: true }).exec();

    if (user) {
      return res.status(200).json(user);
    }
  } catch (err) {
    next(err);
  }
}

module.exports = updateUser;
