import React, {Component} from 'react';
import Singleton from '../socket';
import {withRouter} from "react-router-dom";
import '../css/signIn.css';
import swal from 'sweetalert2';

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
      this.signIn(event);
    }
  }

  signIn(e){
    e.preventDefault();
    const username = this.refs.username.value.trim();

    if (username) {
      this.socket.emit('signIn', username);
    } else {
      swal('Please enter username', '', 'warning');
    }
  }

  render() {
    return (
      <div className="sign-in">
        <div className="form">
          <h3 className="title">Who are you?</h3>
          <input className="username-input" type="text"
                 id = "username"
                 ref = "username"
                 onKeyDown={(e) => this.handleSignIn(e)}
                 maxLength={10}
                 autoFocus="true"
          />
          <button className="intochat"
                  onClick={(e) => this.signIn(e)}
          >Join</button>
        </div>
      </div>
    );
  }
}

export default withRouter(SignIn);