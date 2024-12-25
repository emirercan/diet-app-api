const path = require('path');
const multer = require('multer');

const upload = multer({
  dest: path.join(process.cwd(), 'uploads')
});
module.exports = upload;
