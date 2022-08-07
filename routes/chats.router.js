const express = require("express");
const validationHandler = require("../middlewares/validation.handler");
const { createChatSchema } = require("../schemas/chat.schema");
const ChatsService = require("./../services/chat.service");

const router = express.Router();
const service = new ChatsService();

router.get("/", async (_req, res) => {
  const chats = await service.find();
  res.success(chats);
});

router.get("/:id", async (req, res) => {
  const chat = await service.findOne(req.params.id);
  res.success(chat);
});

router.post(
  "/",
  validationHandler(createChatSchema, "body"),
  async (req, res) => {
    const chat = await service.create(req.body);
    res.success(chat, 201);
  }
);

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  const chat = await service.update(id, changes);
  res.success(chat);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const chat = await service.delete(id);
  res.success(chat);
});

module.exports = router;
