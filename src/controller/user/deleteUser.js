const User = require("../../models/user/model");

async function deleteUser(req, res, next) {
  const { id } = req.params;
  try {
    const userExist = await User.exists({ _id: id });
    if (!userExist) throw new Error(next({ status: 400, msg: "User Doesn't exist" }));

    await User.findOneAndDelete({ _id: id }).exec();
    res.send({ msg: "Sucessfully Deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = deleteUser;
