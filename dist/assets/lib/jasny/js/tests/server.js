/*
 * Simple connect server for phantom.js
 * Adapted from Modernizr
 */

var connect = require('connect')
  , url = require('url')
  , querystring = require('querystring')
  , http = require('http')
  , fs   = require('fs')
  , app = connect()
      .use(connect.static(__dirname + '/../../'))
      .use(function(req, res, next) {
          if (url.parse(req.url).pathname == '/data') res.end(querystring.parse(url.parse(req.url).query).items)
            else next()
      })

http.createServer(app).listen(3000);

fs.writeFileSync(__dirname + '/pid.txt', process.pid, 'utf-8')