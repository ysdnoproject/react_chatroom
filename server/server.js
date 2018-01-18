// Import modules
const ejs = require('ejs')
const path = require('path')
const express = require('express')
const app = express()
const http = require('http').Server(app)
const port = process.env.PORT || 3000;
http.listen(port, () => {console.log('listening on *:'+port)})
const io = require('socket.io')(http);


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

//
var userNumber = 0;

io.sockets.on('connection', function (socket) {
    var signedIn = false;

    socket.on('newMessage', function (text) {
        io.sockets.emit('newMessage',{
            userName: socket.userName,
            text: text
        })
    });

    socket.on('signIn', function (userName) {
        if (signedIn) return;

        // we store the username in the socket session for this client
        socket.userName = userName;
        ++userNumber;
        signedIn = true;

        console.log(userName)

      io.sockets.emit('signInSuccess', {
        userName: userName,
        userNumber: userNumber
      });

        io.sockets.emit('userJoined', {
            userName: userName,
            userNumber: userNumber
        });
    });

    socket.on('disconnect', function () {
        if (signedIn) {
            --userNumber;

            io.sockets.emit('userLeft', {
                userName: socket.userName,
                userNumber: userNumber
            });
        }
    });

});