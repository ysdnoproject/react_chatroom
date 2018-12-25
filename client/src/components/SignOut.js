import React, { Component } from 'react';
import Singleton from '../socket';
import '../css/signOut.css';

class SignOut extends Component {
  constructor(props, context) {
    super(props, context);
    this.socket = Singleton.getInstance();
  }

  handleSignOut(event) {
    event.preventDefault();
    this.socket.emit('signOut');
    this.props.history.push("/");
    Singleton.closeConnection();
  }

  render() {
    return (
      <div className="sign-out">
        <button className="sign-out-btn"
                onClick={ (e) => this.handleSignOut(e) }
        >SignOut
        </button>
      </div>
    );
  }
}

export default SignOut;
