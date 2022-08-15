const express = require("express");
require("express-async-errors"); // allows handling async errors in express
require("dotenv").config();

const responseHandler = require("./middlewares/response.handler");
const useErrorHandlers = require("./middlewares/error.handler");

const connectDatabase = require("./libs/mongoose");
const connectSocket = require("./libs/socket");
const useApiRouter = require("./routes");

const app = express();
const server = require("http").Server(app);
const port = process.env.PORT || 3501;

connectDatabase();
connectSocket(server);

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World");
});

app.use("/app", express.static(__dirname + "/public"));

app.use(responseHandler);

useApiRouter(app);
useErrorHandlers(app);

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
