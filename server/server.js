// Import modules
const ejs = require('ejs');
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log('listening on *:' + port)
});
const io = require('socket.io')(http);
const redis = require("redis");
const redisClient = redis.createClient();
const HashMap = require('hashmap');

redisClient.on("error", function (err) {
  console.log("Error " + err);
});

// Return index.html for '/'
//dev env
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/../client/public/index.html')));

//prod env
// app.get('/', (req, res) => res.render('index'));
// app.set('views', __dirname + '/../client/build');
// app.set('view engine', 'html');
// app.engine('html', ejs.renderFile);
// app.use('/static', express.static(__dirname + '/../client/build/static'));
// app.use('/service-worker.js', express.static(__dirname + '/../client/build'));

let users = new HashMap();

io.sockets.on('connection', function (socket) {
  let address = socket.handshake.address;

  socket.on('signIn', function (username) {
    redisClient.hset(address, "username", username);
    users.set(address, username);

    io.sockets.emit('signInSuccess', {
      username: username,
      userNumber: users.count()
    });

    io.sockets.emit('userJoined', {
      username: username,
      userNumber: users.count()
    });
  });

  socket.on('newMessage', function (text) {
    redisClient.hget(address, "username", function (err, obj){
      io.sockets.emit('newMessage', {
        username: obj,
        text: text
      });
    });
  });

  socket.on('disconnect', function () {
    redisClient.hget(address, "username", function (err, obj){
      if (obj) {
        users.remove(address);

        io.sockets.emit('userLeft', {
          username: obj,
          userNumber: users.count()
        });
      }
    });
  });
});