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

  render() {
    return (
      <div className="sign-in">
        <div className="form">
          <h3 className="title">Who are you?</h3>
          <input className="username-input" type="text"
                 onKeyDown={(e) => this.handleSignIn(e)}
                 maxLength={10}
                 autoFocus="true"
          />
        </div>
      </div>
    );
  }
}

export default withRouter(SignIn);