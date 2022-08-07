const express = require("express");
require("express-async-errors"); // allows to handle async errors in express
require("dotenv").config();

const responseHandler = require("./middlewares/response.handler");
const useErrorHandlers = require("./middlewares/error.handler");

const connectDatabase = require("./libs/mongoose");
const apiRouter = require("./routes");

const app = express();
const port = process.env.PORT || 3501;

connectDatabase();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World");
});

app.use("/app", express.static("public"));

app.use(responseHandler);

apiRouter(app);
useErrorHandlers(app);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
