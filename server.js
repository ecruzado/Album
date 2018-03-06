const express = require('express');
const path = require('path');

const routes = require('./api');

const app = express();

app.set('port', 3000);
routes(app);

app.use(express.static(path.join(__dirname, 'dist')));

var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Server on port ' + port);
});