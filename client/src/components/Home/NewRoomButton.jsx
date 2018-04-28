import React from 'react';
import axios from 'axios';

import '../globals/Button/Button.css';

class NewRoomButton extends React.Component {
  constructor(props) { // { roomId, challengeId, challengeTitle, history}
    super(props);

    this.enterChallenge = this.enterChallenge.bind(this);
  }

  enterChallenge() {
    axios.post('http://localhost:3396/api/challenges/leavingPage', { id: this.props.roomId, challengeId: this.props.challengeId });
    this.props.history.push({
      pathname: `/${this.props.roomId}`,
      state: {
        challenge: this.props.challenge,
        player1: false,
        challengeId: this.props.challengeId,
      }
    });
  }

  render() {
    return(
      <div className={`button-container-newroom`} >
        <button
          id={this.props.roomId}
          className={'button'}
          onClick={this.enterChallenge}
        >{this.props.challengeTitle}
        </button>
      </div>
    )
  }
};

export default NewRoomButton;
