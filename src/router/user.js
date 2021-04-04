const userRouter = require("express").Router();
const { createUser, deleteUser, getUser, updateUserByUserId } = require("../controller/user");
const { methodNotAllowed } = require("../error");

userRouter.route("/").get(getUser).post(createUser).patch(updateUserByUserId).delete(deleteUser).all(methodNotAllowed);

module.exports = userRouter;
