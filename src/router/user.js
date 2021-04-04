const userRouter = require("express").Router();
const { createUser, deleteUser, getUser, updateUser, getAllUsers } = require("../controller/user");
const { methodNotAllowed } = require("../error");

userRouter.route("/").get(getAllUsers).post(createUser).all(methodNotAllowed);
userRouter.route("/:id").get(getUser).post(createUser).patch(updateUser).delete(deleteUser).all(methodNotAllowed);

module.exports = userRouter;
