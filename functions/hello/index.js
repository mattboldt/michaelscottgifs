const fs = require('fs');
const path = require('path');
const Fuse = require('fuse.js');

const responseBody = (body) => {
  return {
    isBase64Encoded: false,
    statusCode: 200,
    headers: {'Access-Control-Allow-Origin': '*'},
    body: JSON.stringify(body)
  };
}

const searchOptions = () => {
  return {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      'titles',
      'tags'
    ]
  };
}

const search = (json, query) => {
  if (!query) {
    return randomImage(json);
  }

  const fuse = new Fuse(json, searchOptions());
  const result = fuse.search(query);

  if (result.length === 0) {
    return randomImage(json);
  }

  return result[0];
}

const randomImage = (json) => {
  const min = 0;
  const max = json.length - 1;
  const num = Math.floor(Math.random() * max) + min;
  return json[num];
}

exports.handle = (e, context, callback) => {
  console.log('processing event: %j', e);

  fs.readFile(__dirname + '/index.json', function (err, data) {
    if (err) throw err;
    const json = JSON.parse(data);
    const query = e.queryStringParameters.query;
    const body = search(json, query);
    callback(null, responseBody(body));
  });
}
