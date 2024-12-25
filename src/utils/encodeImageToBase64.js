const fs = require('fs');

const encodeImageToBase64 = (filePath) => {
    const imageBuffer = fs.readFileSync(filePath);
    return imageBuffer.toString('base64');
  };

  
module.exports = encodeImageToBase64;