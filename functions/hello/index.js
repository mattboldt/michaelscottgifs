let fs = require("fs");
let path = require("path");

console.log('starting function')
exports.handle = (e, context, callback) => {
  console.log('processing event: %j', e);
  let body = {}

  fs.readFile(__dirname + '/index.json', function (err, data) {
    if (err) throw err;
    body = JSON.parse(data);

    const res = {
      isBase64Encoded: false,
      statusCode: 200,
      headers: {},
      body: JSON.stringify(body)
    };
    callback(null, res);
  });
}
