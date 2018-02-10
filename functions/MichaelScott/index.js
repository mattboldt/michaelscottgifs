const fs = require('fs');
      path = require('path');
      Search = require('search.js');

exports.handle = (e, context, callback) => {
  console.log('processing event: %j', e);

  fs.readFile(__dirname + '/index.json', function (err, data) {
    if (err) throw err;
    const json = JSON.parse(data);
    const params = e.queryStringParameters || {};
    const search = new Search(json, params);

    callback(null, search.getResults());
  });
}
