var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);

app.use(function (req, res, next) {
  console.log('middleware');
  req.testing = 'testing';
  return next();
});

app.get('/test', function(req, res, next) {
  console.log('test route');
  res.send({
    'status': 'success'
  });
});

app.ws('/counter', function(ws, req) {
    // TODO should do something here?
    ws.on('message', function(msg) {
        console.log(msg);
    });
    console.log('socket');
});

var counterWs = expressWs.getWss('/counter');
app.post('/counter', function(req, res, next) {
    var newCounter = req.query.counter;
    console.log('post /counter ' + newCounter);

    // TODO update count on DB
    counterWs.clients.forEach(function (client) {
        client.send(newCounter);
    });
    res.send({
        'status': 'success'
    });
});

app.listen(5000);