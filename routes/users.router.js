const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  const allUsers = [
    { id: 1, name: "User 1", age: 20 },
    { id: 2, name: "User 2", age: 30 },
    { id: 3, name: "User 3", age: 40 },
  ];
  const { limit, offset = "0" } = req.query;
  if (limit && offset) {
    res.success(allUsers.slice(offset, offset + limit));
  } else {
    res.success(allUsers);
  }
});

module.exports = router;
