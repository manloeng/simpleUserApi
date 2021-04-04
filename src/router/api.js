const apiRouter = require("express").Router();
const userRouter = require("./user");

apiRouter.use("/users", userRouter);

module.exports = apiRouter;
