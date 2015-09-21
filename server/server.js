/**
 * Hitchhikers super proxy
 * Start using `npm start`
 */
var express = require('express');
var request = require('request');

var app = express();
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World');
});
app.get('/word', function (req, res) {
  var word = req.query && req.query.query;
  // chicken out... should be with error handling and all ....
  if (!word) {
    return res.end();
  }
  // fabulous one line proxy. We should call that one marvin
  req.pipe(request.get('http://dev.betaretail.com/words/complete?query=' + word)).pipe(res);
});

app.listen(1995);
