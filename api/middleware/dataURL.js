const DataURIParser = require('datauri/parser.js');
const path = require('path');

const getDataUrl = (file) => {
  const parser = new DataURIParser();
  const ext = path.extname(file.originalname).toString();

  return parser.format(ext, file.buffer);
};

module.exports = getDataUrl