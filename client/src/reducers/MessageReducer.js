import * as actionTypes from '../constants/ActionTypes'
import * as messageTypes from '../constants/MessageTypes'

const initialState = {
  messages: [{
    type: messageTypes.SYSTEM_MESSAGE,
    text: 'Welcome to our chatting room!'
  }],
};

export default function messages(state = initialState, action) {
  switch (action.type) {
    case actionTypes.RECEIVE_MESSAGE:
      const message = action.message;
      return {
        ...state,
        messages: [...state.messages, {
          type: messageTypes.USER_MESSAGE,
          text: message.text,
          userName: message.userName
        }]
      }
    case actionTypes.USER_JOINED:
      return {
        ...state,
        messages: [...state.messages, {
          type: messageTypes.SYSTEM_MESSAGE,
          text: `${action.data.userName} joined! Now ${action.data.userNumber} participants.`
        }]
      }
    case actionTypes.USER_LEFT:
      return {
        ...state,
        messages: [...state.messages, {
          type: messageTypes.SYSTEM_MESSAGE,
          text: `${action.data.userName} left! Now ${action.data.userNumber} participants.`
        }]
      }
    case actionTypes.SEND_MESSAGE:
    default:
      return state;
  }
}