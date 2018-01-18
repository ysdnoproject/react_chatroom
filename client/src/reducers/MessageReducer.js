import * as actionTypes from '../constants/ActionTypes';
import * as messageTypes from '../constants/MessageTypes';
import {USER_MESSAGE} from "../constants/MessageTypes";

//combineReducers will check your reducers by passing undefined to them;
// this is done even if you specify initial state to Redux.createStore(combineReducers(...), initialState).
// Therefore, you must ensure your reducers work properly when receiving undefined as state,
// even if you never intend for them to actually receive undefined in your own code.
//see https://redux.js.org/docs/api/combineReducers.html#notes
export default function messages(state = [], action) {
  switch (action.type) {
    case actionTypes.RECEIVE_MESSAGE:
      const message = action.message;
      return state.concat([{
        type: USER_MESSAGE,
        text: message.text,
        userName: message.userName
      }]);
    case actionTypes.USER_JOINED:
      return state.concat([{
        type: messageTypes.SYSTEM_MESSAGE,
        text: `${action.data.userName} joined! Now ${action.data.userNumber} participants.`
      }]);
    case actionTypes.USER_LEFT:
      return state.concat([{
        type: messageTypes.SYSTEM_MESSAGE,
        text: `${action.data.userName} left! Now ${action.data.userNumber} participants.`
      }]);
    case actionTypes.SEND_MESSAGE:
    default:
      return state;
  }
}