const User = require("../../models/user/model");

async function deleteUser(req, res, next) {
  const { id } = req.params;
  try {
    await User.findOneAndDelete({ _id: id }).exec();
    res.send({ msg: "Sucessfully Deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = deleteUser;
