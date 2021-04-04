const User = require("../../models/user/model");

async function getAllUsers(req, res, next) {
  try {
    const users = await User.find({}).lean();
    res.send({ users });
  } catch (err) {
    next(err);
  }
}

module.exports = getAllUsers;
