import React, { Component } from 'react';
import randomstring from 'randomstring';
import axios from 'axios';

import EditorHeader from '../globals/EditorHeader';
import Button from '../globals/Button';
import Logo from '../globals/Logo';

import './LandingPage.css';

let slingId;

class Home extends Component {
  state = {
    allChallenges: [],
    selectedChallenge: {}, 
    player1: ''
   }

   async componentDidMount() {
    const { data } = await axios.get(`http://localhost:3396/api/challenges`)
    this.setState({
      allChallenges: data,
      selectedChallenge: JSON.stringify(data[0]),
     });
   }

  randomSlingId = () => {
    slingId = `${randomstring.generate()}`;
  }

  handleDuelClick = async () => {
    this.randomSlingId();
    var params = {
      slingId: slingId,
      challengeId: JSON.parse(this.state.selectedChallenge).id,
    }
    try {
      const returnedSlingId = await axios.get('http://localhost:3396/api/challenges/challengeTracker', {params});
      console.log(returnedSlingId)
      var player1 = slingId === returnedSlingId.data ? true : false; 
      this.setState({player1: player1});
      console.log('PLAYER1', player1)
      slingId = returnedSlingId.data; 

    }
    catch(err) {
      throw new Error(err);
    }

    this.props.history.push({
      pathname: `/${slingId}`,
      state: {
        // challenge: this.state.selectedChallenge, 
        player1: this.state.player1
      }
    });
  }
  
  handleAddChallengeClick = () => {
    this.props.history.push('/addChallenge');
  }

  handleChallengeSelect = (e) => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({ selectedChallenge: value });
  }

  render() {
    return (
      <div className="landing-page-container">
      <EditorHeader history={this.props.history} />
        <br />
        <select onChange={(e) => this.handleChallengeSelect(e)}>
          {this.state.allChallenges.map(challenge => {
            return (
            <option
              value={JSON.stringify(challenge)}
            >
              {challenge.title}
            </option>)
          }
          )}
        </select>
        <br />
        <br />
        <Button
          backgroundColor="red"
          color="white"
          text="Create Challenge"
          onClick={() => this.handleAddChallengeClick()}
        />
        <br />
        <Button
          backgroundColor="red"
          color="white"
          text="Duel"
          onClick={() => this.handleDuelClick()}
        />
      </div>
    );
  }
}

export default Home;
