const User = require("../../models/user/model");

async function getUsers(req, res) {
  try {
    const users = await User.find({}).exec().lean();
    res.send({ users });
  } catch (e) {
    console.log(e);
  }
}

module.exports = getUsers;
