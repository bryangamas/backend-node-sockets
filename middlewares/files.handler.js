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

module.exports = upload;
