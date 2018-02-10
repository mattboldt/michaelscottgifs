const fs = require('fs')
      path = require('path')
      Search = require('search.js');
      // ImageParse = require('imageParse.js');

exports.handle = (e, context, callback) => {
  console.log('processing event: %j', e);

  fs.readFile(__dirname + '/index.json', function (err, data) {
    if (err) throw err;
    const json = JSON.parse(data);
    const params = e.queryStringParameters || {};
    if (params.gif) {
      params.limit = 1;
    }

    const search = new Search(json, params);
    let result = search.getResults();

    if (false) { //params.gif) {
      const parser = new ImageParse(result[0]);
      parser.toImage(callback);
    } else {
      callback(null, responseBody(result));
    }
  });
}

const responseBody = (body) => {
  return {
    isBase64Encoded: false,
    statusCode: 200,
    headers: {'Access-Control-Allow-Origin': '*'},
    body: JSON.stringify(body)
  };
}
