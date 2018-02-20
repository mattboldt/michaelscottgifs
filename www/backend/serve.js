/* global require */
/* global process */

const FastBootAppServer = require('fastboot-app-server');
const ExpressHTTPServer = require('fastboot-app-server/src/express-http-server');
const fs = require('fs');
const path = require('path');
const db = require('./db');
const Search = require('./search');
const ENV = process.env.NODE_ENV || 'development';
const httpServer = new ExpressHTTPServer();
const app = httpServer.app;

app.get('/api', function(req, res) {
  const conn = db.connect()
  let models = {};

  fs.readFile(path.resolve('.') + '/backend/index.json.min', function (err, data) {
    var model = conn.import(data);
    console.log(model.name);
    models[model.name] = model;

    if (err) throw err;
    const json = JSON.parse(data);
    const params = req.query || {};
    const search = new Search(json, params);
    let result = search.getResults();

    res.set({'Access-Control-Allow-Origin': '*'})
    res.send(result);
  });

  conn.then(() => {
  }).catch(() => {
    res.send('Unable to connect to the database:');
  });


});

let server = new FastBootAppServer({
  httpServer: httpServer,
  distPath: 'dist',
  gzip: true,
  beforeMiddleware(app) {
    app.use((request, response, next) => {
      if (ENV === 'development' || request.headers['x-forwarded-proto'] === 'https') {
        return next();
      } else {
        return response.redirect(301, `https://${request.hostname}${request.url}`);
      }
    });
  }
});

server.start();
