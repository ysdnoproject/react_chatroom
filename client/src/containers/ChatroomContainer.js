import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../action/actions';
import Chatroom from '../components/Chatroom/Chatroom';
import bindActionCreators from "redux/src/bindActionCreators";

const mapStateToProps = state => {
  return {
    messages: state.messages,
  }
}

const ChatroomContainer = connect(
  mapStateToProps,
  actions
)(Chatroom)

// difference???
// const mapDispatchToProps = (dispatch, ownProps) => {
//   return bindActionCreators({
//     receiveMessage: actions.receiveMessage,
//     sendMessage: actions.sendMessage,
//     userJoined: actions.userJoined,
//     userLeft: actions.userLeft
//   }, dispatch);
// }
//
// const ChatroomContainer = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Chatroom)

export default ChatroomContainer
