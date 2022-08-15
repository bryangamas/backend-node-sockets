const express = require("express");

const usersRouter = require("./users.router");
const chatsRouter = require("./chats.router");
const messagesRouter = require("./messages.router");

function useApiRouter(app) {
  const router = express.Router();
  app.use("/api", router);

  /** Routes */
  router.use("/chats", chatsRouter);
  router.use("/users", usersRouter);
  router.use("/chats/:chatId/messages", messagesRouter);
}

module.exports = useApiRouter;
