const userRouter = require("express").Router();
const { createUser, deleteUser, getUser, updateUserByUserId, getAllUsers } = require("../controller/user");
const { methodNotAllowed } = require("../error");

userRouter.route("/").get(getUser).post(createUser).patch(updateUserByUserId).delete(deleteUser).all(methodNotAllowed);

// Easy checks can be made here!
userRouter.route("/all").get(getAllUsers).all(methodNotAllowed);

module.exports = userRouter;
