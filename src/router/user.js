const userRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");

userRouter.route("/").get().post().update().delete().all(methodNotAllowed);

module.exports = userRouter;
