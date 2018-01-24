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
const redisClient = redis.createClient('redis://h:pb1a29fc0e63dd615ac80540d2e95e99a8f99e8d341e6c4c6a417e70c64c3bf2d@ec2-35-169-191-180.compute-1.amazonaws.com:27229');
const HashMap = require('hashmap');

redisClient.on("error", function (err) {
  console.log("Error " + err);
});

// Return index.html for '/'
//dev env
// app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/../client/public/index.html')));

//prod env
app.get('/', (req, res) => res.render('index'));
app.set('views', __dirname + '/build');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.use('/static', express.static(__dirname + '/build/static'));
app.use('/service-worker.js', express.static(__dirname + '/build'));

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

  socket.on('signOut', function () {
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