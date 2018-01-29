import React, {Component} from 'react';
import Singleton from '../../socket';
import SignOut from "../SignOut";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import '../../css/chat.css';
import PropTypes from 'prop-types';

export default class Chatroom extends Component {

  constructor(props, context) {
    super(props, context);
    this.socket = Singleton.getInstance();

    this.socket.removeEventListener('newMessage');
    this.socket.removeEventListener('userJoined');
    this.socket.removeEventListener('userLeft');
    const {receiveMessage, userJoined, userLeft} = props;
    this.socket.on('newMessage', function (msg) {
      receiveMessage(msg);
      scrollToBottom();
    });
    this.socket.on('userJoined', function (data) {
      userJoined(data);
      scrollToBottom();
    });
    this.socket.on('userLeft', function (data) {
      userLeft(data);
      scrollToBottom();
    });
    this.socket.emit('userJoined');
  }

  sendMessage(newMessage) {
    const {sendMessage} = this.props;
    if (newMessage) {
      sendMessage(newMessage);
      this.socket.emit('newMessage', newMessage);
    }
  }

  render() {
    return (
      <div className="chat">
        <SignOut/>
        <MessageList messages={this.props.messages}/>
        <MessageInput sendMessage={(msg) => this.sendMessage(msg)}/>
      </div>
    );
  }
}

function scrollToBottom() {
  let messagesWidget = document.querySelector(".messages");
  if (messagesWidget) {
    messagesWidget.scrollTo(0, messagesWidget.scrollHeight);
  }
}

Chatroom.propTypes = {
  receiveMessage: PropTypes.func.isRequired,
  userJoined: PropTypes.func.isRequired,
  userLeft: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
};
