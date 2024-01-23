const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

module.exports = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb("Format file must be PNG, JPG, or JPEG", false);
    }
  },
}).single("image");
