import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/Reducer';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignIn from "./components/SignIn";
import ChatroomContainer from "./containers/ChatroomContainer";
import { devToolsEnhancer } from "redux-devtools-extension";
import { SYSTEM_MESSAGE } from "./constants/MessageTypes";

const initState = {
  messages: [{
    type: SYSTEM_MESSAGE,
    text: 'Welcome to our chatting room!'
  }],
};

const store = createStore(reducer, initState)

//only dev
// const store = createStore(reducer, initState, devToolsEnhancer(
//   // Specify name here, actionsBlacklist, actionsCreators and other options if needed
// ));

//必须要用div或者switch包裹 否则 会报错(div会渲染所有匹配的，switch会渲染匹配到的第一个)
//exact path只会匹配完全匹配的路径，否则会匹配所有以指定的string开头的（比如'/'会匹配所有路径，但是加了exact就只会匹配'/'）
ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ SignIn }/>
        <Route path="/chat" component={ ChatroomContainer }/>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
