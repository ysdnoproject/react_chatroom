import React, {Component} from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert2'

export default class MessageInput extends Component {

  handleKeyDown(event) {
    if (event.which === 13) {
      this.sendMsg(event);
    }
  }

  sendMsg(e){
    e.preventDefault();
    const text = this.refs.input.value.trim();
    const inputWidget = this.refs.input;
    if (text.length > 0) {
      this.props.sendMessage(text);
      inputWidget.value = '';
      inputWidget.focus();
    }else{
      swal('Please enter message', '', 'warning').then(
        function () {
          inputWidget.focus();
        }
      );
    }
  }

  render() {
    return (
      <div className="sent-frame">
        <input className="input-message"
              id = 'msg-txt'
              placeholder="Type here..."
              autoFocus="true"
              ref="input"
              onKeyDown={(e) => this.handleKeyDown(e)}/>
        <button className = "sendbtn"
                onClick = {(e) => this.sendMsg(e)}>
        Send</button>
      </div>
    );
  }
}

MessageInput.propTypes = {
  sendMessage: PropTypes.func.isRequired,
}
