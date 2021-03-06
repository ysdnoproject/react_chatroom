import React, { Component } from 'react';
import Singleton from '../socket';
import MobileUtil from '../util/MobileUtil';
import '../css/signIn.css';
import swal from 'sweetalert2';

class SignIn extends Component {
  handleSignIn(event) {
    if (event.which === 13) {
      this.signIn(event);
    }
  }

  signIn(e) {
    e.preventDefault();

    const inputWidget = this.input;
    const username = inputWidget.value.trim();
    const socket = Singleton.getInstance();

    socket.removeAllListeners();
    socket.open();
    const props = this.props;

    socket.on('signInSuccess', function (data) {
      props.history.push("/chat");
    });

    if (username) {
      socket.emit('signIn', username);
    } else {
      swal('Please enter username', '', 'warning').then(
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
      <div className="sign-in">
        <div className="form">
          <h3 className="title">Who are you?</h3>
          <input className="username-input" type="text"
                 id="username"
                 ref={ (input) => {
                   this.input = input;
                 } }
                 onKeyDown={ (e) => this.handleSignIn(e) }
                 maxLength={ 10 }
                 autoFocus="true"
          />
          <button className="intochat"
                  onClick={ (e) => this.signIn(e) }
          >Join
          </button>
        </div>
      </div>
    );
  }
}

export default SignIn;
