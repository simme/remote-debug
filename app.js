var express = require('express')
  , socket  = require('socket.io')
  , app     = express.createServer()
  , io      = socket.listen(app);

app.listen(1337);

app.configure(function () {
  app.use("/", express.static(__dirname))
});

io.sockets.on('connection', function (s) {
  s.on('log', function (data) {
    s.broadcast.emit('log', data);
    console.log('broadcasting...');
  });
});