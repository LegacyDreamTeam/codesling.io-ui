import React, { Component } from 'react';
import io from 'socket.io-client/dist/socket.io.js';

import Sling from './Sling.jsx';

class SlingIndex extends Component {
  state = { 
    socket: null,
   }

  componentWillMount() {
    this.socket = io('http://localhost:4155', {
      query: {
        roomId: this.props.location.pathname.slice(1),
        player: this.props.location.state.player1 === true ? 1 : 2
      }
    });
    this.setState({ socket: this.socket });
  }

  render() {
    if (this.props.location.state) {
      return (
        <Sling socket={this.state.socket} challengeId={this.props.location.state.challengeId} roomId={this.props.location.pathname.slice(1)} player={this.socket.query.player} challenge={this.props.location.state.challenge} history={this.props.history}/>
      );
    } else {
      return (
        <Sling socket={this.state.socket} challengeId={this.props.location.state.challengeId} roomId={this.props.location.pathname.slice(1)} challenge={{}} player={this.socket.query.player} history={this.props.history}/>
      );
    }
  }
}

export default SlingIndex;
