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

var counterWs = expressWs.getWss('/counter');
app.ws('/counter', function(ws, req) {
    // initial default counter for everyone
    counterWs.clients.forEach(function (client) {
        client.send(2023);
    });

    ws.on('message', function(newCounter) {
        // signal all others clients about new counter value
        counterWs.clients.forEach(function (client) {
            client.send(newCounter);
        });
    });
});

// Maybe it's better to use the WebSocket plugin instead of the post method
// app.post('/counter', function(req, res, next) {
//     var newCounter = req.query.counter;
//     console.log('post /counter ' + newCounter);

//     // TODO update count on DB
//     counterWs.clients.forEach(function (client) {
//         client.send(newCounter);
//     });
//     res.send({
//         'status': 'success'
//     });
// });

app.listen(5000);