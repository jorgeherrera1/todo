var express = require('express'),
    app = express();

app.use(express.static(__dirname + '/app'));
app.use('/lib', express.static(__dirname + '/bower_components'));

var server = app.listen(3000, function () {
  var port = server.address().port;

  console.log('TODO server listening on port: %s', port);
});
