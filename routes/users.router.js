const express = require("express");
const validationHandler = require("../middlewares/validation.handler");
const { getUserSchema, createUserSchema } = require("../schemas/user.schema");
const UserService = require("./../services/user.service");

const service = new UserService();
const router = express.Router();

router.get("/", async (_req, res) => {
  const users = await service.find();
  res.success(users);
});

router.get(
  "/:id",
  validationHandler(getUserSchema, "params"),
  async (req, res) => {
    const id = req.params.id;
    const user = await service.findOne(id);
    res.success(user);
  }
);

router.post(
  "/",
  validationHandler(createUserSchema, "body"),
  async (req, res) => {
    const user = await service.create(req.body);
    res.success(user);
  }
);

module.exports = router;
