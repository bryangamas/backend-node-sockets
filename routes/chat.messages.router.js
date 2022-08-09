const express = require("express");
const validationHandler = require("../middlewares/validation.handler");
const { createMessageSchema } = require("../schemas/chat.message.schema");
const pageValidation = require("../schemas/utils/pageValidation");

const ChatMessagesService = require("./../services/chat.messages.service");

const router = express.Router({ mergeParams: true });
const service = new ChatMessagesService();

router.get("/", pageValidation(), async (req, res) => {
  const chatId = req.params.chatId;
  const message = await service.find(chatId, req.query);
  res.success(message);
});

router.post(
  "/",
  validationHandler(createMessageSchema, "body"),
  async (req, res) => {
    const chatId = req.params.chatId;
    const message = await service.create(chatId, req.body);
    res.success(message);
  }
);

module.exports = router;
