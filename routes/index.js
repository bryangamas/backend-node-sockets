const express = require("express");

const usersRouter = require("./users.router");
const chatsRouter = require("./chats.router");

function apiRouter(app) {
  const router = express.Router();
  app.use("/api", router);

  /** Routes */
  router.use("/chats", chatsRouter);
  router.use("/users", usersRouter);
}

module.exports = apiRouter;
