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
      }else{
        alert('请输入内容~');
        return false;
      }
    }
  }

  /**
   * @description send mesaages
   */
  sendMsg(e){
    e.preventDefault();
    const text = document.getElementById('msg-txt').value;
    if (text.length > 0) {
      this.props.sendMessage(text);
      this.refs.input.value = '';
    }else{
      alert('请输入内容~');
      return false;
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
        <button className = "sentbtn"
                onClick = {(e) => this.sendMsg(e)}>
        发送</button>
      </div>
    );
  }
}

MessageInput.propTypes = {
  sendMessage: PropTypes.func.isRequired,
}
