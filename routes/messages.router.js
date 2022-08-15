const express = require("express");
const validationHandler = require("../middlewares/validation.handler");
const {
  getParamsSchema,
  createMessageSchema,
} = require("../schemas/message.schema");
const pageValidation = require("../schemas/utils/pageValidation");

const MessagesService = require("./../services/messages.service");

const router = express.Router({ mergeParams: true });
const service = new MessagesService();

router.get(
  "/",
  validationHandler(getParamsSchema, "params"),
  pageValidation(),
  async (req, res) => {
    const chatId = req.params.chatId;
    const message = await service.find(chatId, req.query);
    res.success(message);
  }
);

router.post(
  "/",
  validationHandler(getParamsSchema, "params"),
  validationHandler(createMessageSchema, "body"),
  async (req, res) => {
    const chatId = req.params.chatId;
    const message = await service.create(chatId, req.body);
    res.success(message);
  }
);

module.exports = router;
