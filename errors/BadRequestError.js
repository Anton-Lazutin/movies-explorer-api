const { HTTP_STATUS_BAD_REQUEST } = require('http2').constants; // 400

module.exports = class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_BAD_REQUEST;
  }
};
