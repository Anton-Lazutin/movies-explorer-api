const { HTTP_STATUS_FORBIDDEN } = require('http2').constants; // 403

module.exports = class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_FORBIDDEN;
  }
};
