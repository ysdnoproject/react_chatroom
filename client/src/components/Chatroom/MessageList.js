import React from 'react';
import MessageItem from "./MessageItem";
import PropTypes from 'prop-types';

const MessageList = ({ messages }) => (
  <div className="chat-area">
    <ul className="messages">
      { messages.map((message, index) =>
        <MessageItem message={ message } key={ index }/>
      ) }
    </ul>
  </div>
);

export default MessageList;

MessageList.propTypes = {
  messages: PropTypes.array.isRequired,
};
