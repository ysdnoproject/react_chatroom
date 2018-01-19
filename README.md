# react_chatroom

## 用到的技术：
### client: 
[react js](https://reactjs.org/) [redux](https://github.com/reactjs/redux) [react-redux](https://github.com/reactjs/react-redux) [react-router](https://github.com/ReactTraining/react-router) [socket.io-client](https://socket.io/) [prop-types](https://github.com/facebook/prop-types) 

### server:
[expressjs](http://expressjs.com/) [socket.io](https://socket.io/)

## 在线演示:

[view](TODO)


## 搭建:
production和dev的代码有所区别：TODO
### production:
```
cd project_path
git co production
cd client
npm install
npm run build
cd ../server
npm install
node server.js
```
然后打开 `localhost:3000`


### dev:
```
cd project_path
git co master
cd client
npm install
npm start
#open a new terminal
cd project_path
git co master
cd server
npm install
PORT=5000 node server.js
```
然后打开 `localhost:3000`



