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

  io.sockets.emit('systemError', {
    errorType: 'redisError',
    nativeError: err,
    errorMessage: err
  });
});

// Return index.html for '/'
//dev env
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/../client/public/index.html')));

// //prod env
// app.get('/', (req, res) => res.render('index'));
// app.get('/chat', (req, res) => res.render('index'));
// app.set('views', __dirname + '/build');
// app.set('view engine', 'html');
// app.engine('html', ejs.renderFile);
//
// //service-worker config
// app.use(express.static(__dirname + '/build'));

let users = new HashMap();

io.sockets.on('connection', function (socket) {
  //see https://stackoverflow.com/questions/14382725/how-to-get-the-correct-ip-address-of-a-client-into-a-node-socket-io-app-hosted-o
  let address = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address;

  socket.on('signIn', function (username) {
    redisClient.hset(address, "username", username);

    io.sockets.emit('signInSuccess', {
      username: username,
      userNumber: users.count()
    });
  });

  socket.on('userJoined', function () {
    redisClient.hget(address, "username", function (err, obj) {
      if (obj) {
        users.set(address, obj);
        io.sockets.emit('userJoined', {
          username: obj,
          userNumber: users.count()
        });
      }
    });
  });

  socket.on('newMessage', function (text) {
    redisClient.hget(address, "username", function (err, obj) {
      io.sockets.emit('newMessage', {
        username: obj,
        text: text
      });
    });
  });

  socket.on('signOut', function () {
    redisClient.hget(address, "username", function (err, obj) {
      if (obj) {
        users.remove(address);

        io.sockets.emit('userLeft', {
          username: obj,
          userNumber: users.count()
        });
      }
    });
  });

  socket.on('disconnect', function () {
    redisClient.hget(address, "username", function (err, obj) {
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
