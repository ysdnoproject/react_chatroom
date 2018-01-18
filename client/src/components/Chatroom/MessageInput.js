import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class MessageInput extends Component {

  handleKeyDown(event) {
    if (event.which === 13) {
      event.preventDefault();
      const text = event.target.value;
      if (text.length > 0) {
        this.props.sendMessage(text);
        this.refs.input.value = '';
      }
    }
  }

  render() {
    return (
      <input className="input-message"
             placeholder="Type here..."
             autoFocus="true"
             ref="input"
             onKeyDown={(e) => this.handleKeyDown(e)}/>
    );
  }
}

MessageInput.propTypes = {
  sendMessage: PropTypes.func.isRequired,
}
