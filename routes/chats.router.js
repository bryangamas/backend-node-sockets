const express = require("express");
const validationHandler = require("../middlewares/validation.handler");
const { getChatSchema, createChatSchema } = require("../schemas/chat.schema");

const ChatsService = require("./../services/chat.service");
const chatMessagesRouter = require("./chat.messages.router");

const router = express.Router();
const service = new ChatsService();

router.get("/", async (_req, res) => {
  const chats = await service.find();
  res.success(chats);
});

router.get(
  "/:id",
  validationHandler(getChatSchema, "params"),
  async (req, res) => {
    const chat = await service.findOne(req.params.id);
    res.success(chat);
  }
);

router.post(
  "/",
  validationHandler(createChatSchema, "body"),
  async (req, res) => {
    const chat = await service.create(req.body);
    res.success(chat, 201);
  }
);

router.put(
  "/:id",
  validationHandler(getChatSchema, "params"),
  validationHandler(createChatSchema, "body"),
  async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    const chat = await service.update(id, changes);
    res.success(chat);
  }
);

router.delete(
  "/:id",
  validationHandler(getChatSchema, "params"),
  async (req, res) => {
    const { id } = req.params;
    const chat = await service.delete(id);
    res.success(chat);
  }
);

router.use(
  "/:chatId/messages",
  validationHandler(getChatSchema, "params"),
  chatMessagesRouter
);

module.exports = router;
