import React, {Component} from 'react';
import Singleton from '../../socket';
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import '../../css/chat.css';
import PropTypes from 'prop-types';

export default class Chatroom extends Component {

  constructor(props, context) {
    super(props, context);
    this.socket = Singleton.getInstance();
  }

  componentWillMount() {
    const {receiveMessage, userJoined, userLeft} = this.props;
    this.socket.on('newMessage', function (msg) {
      receiveMessage(msg);
    });
    this.socket.on('userJoined', function (data) {
      userJoined(data);
    });
    this.socket.on('userLeft', function (data) {
      userLeft(data);
    });
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
        <MessageList messages={this.props.messages}/>
        <MessageInput sendMessage={(msg) => this.sendMessage(msg)}/>
      </div>
    );
  }
}

Chatroom.propTypes = {
  receiveMessage: PropTypes.func.isRequired,
  userJoined: PropTypes.func.isRequired,
  userLeft: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
}
