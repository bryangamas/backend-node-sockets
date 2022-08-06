const express = require("express");
require("dotenv").config();

const connectDatabase = require("./config/database");

const app = express();
const port = process.env.PORT || 3501;

connectDatabase();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World");
});

app.use("/app", express.static("public"));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
