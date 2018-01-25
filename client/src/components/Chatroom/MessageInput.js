import React, {Component} from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert2';
import MobileUtil from '../../util/mobileUtil';

export default class MessageInput extends Component {

  handleKeyDown(event) {
    if (event.which === 13) {
      this.sendMsg(event);
    }
  }

  sendMsg(e){
    e.preventDefault();
    const inputWidget = this.input;
    const text = inputWidget.value.trim();
    if (text) {
      this.props.sendMessage(text);
      inputWidget.value = '';
      if (!MobileUtil.isMobile()) {
        inputWidget.focus();
      }
    }else{
      swal('Please enter message', '', 'warning').then(
        function () {
          if (!MobileUtil.isMobile()) {
            inputWidget.focus();
          }
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
              ref={(input) => {this.input = input}}
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
