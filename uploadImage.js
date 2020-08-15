const multer = require("multer");
module.exports.uploader = (locatoin, fieldname) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, locatoin);
    },
    filename: function (req, file, cb) {
      cb(null, `${new Date().toDateString()} ${file.originalname}`);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
      cb(null, true);
    cb(null, false);
  };
  const upload = multer({
    storage: storage,
    limits: {
      fieldSize: 1024 * 1024 * 20,
    },
    fileFilter: fileFilter,
  });
  return upload.single(fieldname);
};
