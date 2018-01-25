# react_chatroom

## 感谢[Kisn](https://github.com/Kisnnnnn)的友情帮助

## 用到的技术：
首先需要安装[redis](https://redis.io/)并在默认端口(6379)启动

### client: 
[react js](https://reactjs.org/) 
[redux](https://github.com/reactjs/redux) 
[react-redux](https://github.com/reactjs/react-redux) 
[react-router](https://github.com/ReactTraining/react-router) 
[socket.io-client](https://socket.io/) 
[prop-types](https://github.com/facebook/prop-types) 
[sweetalert2](https://github.com/sweetalert2/sweetalert2)
[mobile-detect](https://github.com/hgoebl/mobile-detect.js)

### server:
[expressjs](http://expressjs.com/) 
[socket.io](https://socket.io/)
[redis](https://redis.io/)
[node_redis](https://github.com/NodeRedis/node_redis)
[hashmap_js](https://github.com/flesler/hashmap)

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

## 更新日志
###  新增 pending 分支 测试版本
#### 更新 2018年01月23日15:43:54
- 优化界面布局
- 新增按钮:进入、发送 优化交互
