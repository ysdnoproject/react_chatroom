import React from 'react';
import * as messageTypes from '../../constants/MessageTypes'
import PropTypes from 'prop-types';

export default class MessageItem extends React.Component {
  render() {
    const {message} = this.props;
    switch (message.type) {
      case messageTypes.USER_MESSAGE:
        const userNameColor = this._getUserNameColor(message.userName);
        return (
          <li className="user-message">
            <span className="user-name" style={{color: userNameColor}}>{message.userName}</span>
            <span className="message-body">{message.text}</span>
          </li>
        );
      case messageTypes.SYSTEM_MESSAGE:
        return (
          <li className="system-message">
            {message.text}
          </li>
        );
    }
  }

  _getUserNameColor(userName) {
    const COLORS = [
      '#e21400', '#91580f', '#f8a700', '#f78b00',
      '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
      '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
    ];
    // Compute hash code
    let hash = 7;
    for (let i = 0; i < userName.length; i++) {
      hash = userName.charCodeAt(i) + (hash << 5) - hash;
    }
    // Calculate color
    const index = Math.abs(hash % COLORS.length);
    return COLORS[index];
  }
}

//use exact is more strict than shape (see https://github.com/facebook/prop-types/pull/41)
const MessagePropTypes = PropTypes.oneOfType([
  PropTypes.exact({
    type: PropTypes.oneOf([messageTypes.USER_MESSAGE]),
    userName: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
  PropTypes.exact({
    type: PropTypes.oneOf([messageTypes.SYSTEM_MESSAGE]),
    text: PropTypes.string.isRequired,
  })
]).isRequired

MessageItem.propTypes = {
  message: MessagePropTypes
}
