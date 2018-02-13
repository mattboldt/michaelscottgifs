const FastBootAppServer = require('fastboot-app-server');
const ExpressHTTPServer = require('fastboot-app-server/src/express-http-server');
const fs = require('fs');
const path = require('path');
const Search = require('./backend/search.js');
const ENV = process.env.NODE_ENV || 'development';
const port = ENV === 'development' ? 4040 : 8080;

const httpServer = new ExpressHTTPServer({
  port: port,
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
const app = httpServer.app;

app.get('/api', function(req, res) {
  fs.readFile(path.resolve('.') + '/backend/index.json.min', function (err, data) {
    if (err) throw err;
    const json = JSON.parse(data);
    const params = null || {};
    if (params.gif) {
      params.limit = 1;
    }
    const search = new Search(json, params);
    let result = search.getResults();

    res.set({'Access-Control-Allow-Origin': '*'})
    res.send(result);
  });
});

let server = new FastBootAppServer({
  httpServer: httpServer,
  distPath: 'dist'
});

server.start();
