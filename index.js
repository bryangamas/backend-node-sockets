const express = require("express");

const app = express();
const port = process.env.PORT || 3501;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
