import React, {Component} from 'react';
import Singleton from '../socket';
import {withRouter} from "react-router-dom";
import '../css/signIn.css';

class SignIn extends Component {
  constructor(props, context) {
    super(props, context);
    this.socket = Singleton.getInstance();
    this.socket.on('signInSuccess', function (data) {
      props.history.push("/chat");
    });
  }

  handleSignIn(event) {
    if (event.which === 13) {
      event.preventDefault();
      const username = event.target.value.trim();
      this.socket.emit('signIn', username);
    }
  }

  /**
   * @description into chatroom
   */
  intoChat(e){
    e.preventDefault();
    const username = document.getElementById('username').value.trim();

    // 判断名字是否为空 
    if (username == '') {
      alert('请你的输入名字~~~');
      return false;
    }

    this.socket.emit('signIn', username);
  }

  render() {
    return (
      <div className="sign-in">
        <div className="form">
          <h3 className="title">Who are you?</h3>
          <input className="username-input" type="text"
                 id = "username"
                 onKeyDown={(e) => this.handleSignIn(e)}
                 maxLength={10}
                 autoFocus="true"
          />
          <button className="intochat"
                  onClick={(e) => this.intoChat(e)}
          >进入</button>
        </div>
      </div>
    );
  }
}

export default withRouter(SignIn);