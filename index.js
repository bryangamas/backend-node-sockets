const express = require("express");
require("dotenv").config();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "./public/files");
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const upload = multer({ storage: storage });

const connectDatabase = require("./config/database");

const app = express();
const port = process.env.PORT || 3501;

connectDatabase();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World");
});

app.use("/app", express.static("public"));

app.post("/api/send-file", upload.single("file"), (req, res) => {
  // eslint-disable-next-line no-console
  console.log({ body: req.body, file: req.file });
  res.send("File uploaded");
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
