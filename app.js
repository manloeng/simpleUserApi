const express = require("express");
const app = express();
const port = 3030;
const mongoose = require("mongoose");
const connectToMongoose = require("./utils/mongo");
const apiRouter = require("./src/router/api");
const { routeNotFound, handleCustomErrors, handle500 } = require("./src/error");

require("dotenv").config();

mongoose.set("useFindAndModify", false);
connectToMongoose();

app.use(express.static("public"));
app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", routeNotFound);

app.use(handleCustomErrors);
app.use(handle500);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
