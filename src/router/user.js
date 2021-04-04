const userRouter = require("express").Router();
const { createUser, deleteUser, getUser, updateUser, getAllUsers } = require("../controller/user");
const { methodNotAllowed } = require("../error");

userRouter.route("/").post(createUser).delete(deleteUser).all(methodNotAllowed);
userRouter.route("/:id").get(getUser).post(createUser).patch(updateUser).delete(deleteUser).all(methodNotAllowed);

// Easy checks can be made here!
userRouter.route("/all").get(getAllUsers).all(methodNotAllowed);

module.exports = userRouter;
