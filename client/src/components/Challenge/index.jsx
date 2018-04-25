import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import EditorHeader from '../globals/EditorHeader';

class Challenge extends Component {
  state = {
    challenges: []
   }
  
  componentDidMount() {
    this.fetchAllChallenges();
  }

  fetchAllChallenges = async () => {
    const id = localStorage.getItem('id');
    const { data } = await axios.get(`http://localhost:3396/api/usersChallenges/${id}`);
    if(data.length) {
      this.setState({ challenges: data });
    }
  }

  render() {
    return (
      <div>
      <EditorHeader history={this.props.history} />
      <br/>
        {this.state.challenges.map(challenge => {
          return (
            <ul>
              <li>title: {challenge.title} </li>
              <li>content: {challenge.content} </li>
              <li>difficulty: {challenge.difficulty} </li>
              <li>rating: {challenge.rating} </li>
              <li></li>
            </ul>
          )
        })}
      </div>
    );
  }
}

export default Challenge;

{/* <Switch>
  <Route path='/addChallenge' component={AddChallenge} />
</ Switch>    */}