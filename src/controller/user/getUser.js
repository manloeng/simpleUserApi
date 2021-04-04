async function getUser(req, res) {
  try {
    const user = await User.find({_id: id}).lean();
    res.send({ user });
  } catch (e) {
    console.log(e);
  }
}

module.exports = getUser;
