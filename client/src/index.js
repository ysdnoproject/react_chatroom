import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers/Reducer';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import SignIn from "./components/SignIn";
import ChatroomContainer from "./containers/ChatroomContainer";
import {devToolsEnhancer} from "redux-devtools-extension";
import {SYSTEM_MESSAGE} from "./constants/MessageTypes";

const initState = {
  messages: [{
    type: SYSTEM_MESSAGE,
    text: 'Welcome to our chatting room!'
  }],
};

// const store = createStore(messages, initState)

//only dev
const store = createStore(reducer, initState, devToolsEnhancer(
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
));

//必须要div 否则 会报错(div总是会render /  应该用switch)
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/chat" component={ChatroomContainer}></Route>
        <Route path="/" component={SignIn}/>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
