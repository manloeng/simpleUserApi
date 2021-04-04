const express = require("express");
const app = express();
const port = 3030;
const apiRouter = require("./routes/api");
const { routeNotFound, handleCustomErrors, handle500 } = require("./errors");

require("dotenv").config();

app.use(express.static("public"));
app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", routeNotFound);

app.use(handleCustomErrors);
app.use(handle500);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
