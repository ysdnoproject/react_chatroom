# react_chatroom

##  新增 pending 分支 测试版本
### 更新 2018年01月23日15:43:54
#### 1、优化界面布局
#### 2、新增按钮:进入、发送 优化交互

## 用到的技术：
### client: 
[react js](https://reactjs.org/) [redux](https://github.com/reactjs/redux) [react-redux](https://github.com/reactjs/react-redux) [react-router](https://github.com/ReactTraining/react-router) [socket.io-client](https://socket.io/) [prop-types](https://github.com/facebook/prop-types) 

### server:
[expressjs](http://expressjs.com/) [socket.io](https://socket.io/)

## 在线演示:

[view](https://react-chatroom-yuan.herokuapp.com)


## 搭建:
### production:
```
cd project_path
git checkout production
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
git checkout master
cd server
npm install
PORT=5000 node server.js
#open a new terminal
cd project_path
git checkout master
cd client
npm install
npm start
```
然后打开 `localhost:3000`

## production和dev的代码区别：
- 遵循[redux-devtools](https://github.com/gaearon/redux-devtools)的指导。devToolsEnhancer在production里去掉。
即 [index.js](client/src/index.js) createStore不应该带有devToolsEnhancer

- [server.js](server/server.js)配置有所区别

## 杂谈
- 推荐<https://www.heroku.com>可以免费部署个人项目，缺点就是国内速度会比较慢。
