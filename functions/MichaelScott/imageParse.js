const request = require('request')
      fs = require('fs');

module.exports = class ImageParse {
  constructor(result) {
    this.result = result;
  }

  // TODO: get this to work.
  toImage(callback) {
    request.get(this.result.url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        const image = new Buffer(body).toString('base64');
        const response = {
          isBase64Encoded: true,
          statusCode: 200,
          headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'image/gif', 'Content-Transfer-Encoding': 'base64'},
          body: image
        };
        callback(null, response);
      }
    });
  }
}