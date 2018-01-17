import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
// import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import messages from './reducers/MessageReducer'
import App from './components/App'

let store = createStore(messages)
ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
