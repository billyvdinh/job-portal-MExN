const fs = require('fs');
const multer = require('multer');

const dir = 'uploads/';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, dir);
  },

  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage });
const uploader = upload.array('attachments');

module.exports = uploader;
