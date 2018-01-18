import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import messages from './reducers/MessageReducer';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import SignIn from "./components/SignIn";
import ChatroomContainer from "./containers/ChatroomContainer";
import {devToolsEnhancer} from "redux-devtools-extension";

// let store = createStore(messages)

//only dev
const store = createStore(messages, /* preloadedState, */ devToolsEnhancer(
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
