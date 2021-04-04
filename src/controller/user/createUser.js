async function createUser(req, res, next) {
  const { email, givenName, familyName } = req.body;

  try {
    const user = new User({
      email,
      givenName,
      familyName,
    });

    res.send({ user });
  } catch (e) {
    console.log(e);
  }
}

module.exports = createUser;
