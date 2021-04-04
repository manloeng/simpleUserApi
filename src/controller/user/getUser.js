const User = require("../../models/user/model");

async function getUser(req, res, next) {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id }).lean();
    res.send({ user });
  } catch (err) {
    next(err);
  }
}

module.exports = getUser;
