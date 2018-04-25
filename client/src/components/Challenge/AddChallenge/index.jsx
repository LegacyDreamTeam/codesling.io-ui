import React, { Component } from 'react';
import axios from 'axios';

import Input from '../../globals/forms/Input';
import TextArea from '../../globals/forms/TextArea';
import Button from '../../globals/Button/';
import Logo from '../../globals/Logo';
import EditorHeader from '../../globals/EditorHeader';

import './Auth.css';

class AddChallenge extends Component {
  state = { 
    title: '',
    content: '',
    output: '',
    tests: '',
    difficulty: null
   }

  submitChallenge = async (e) => {
    e.preventDefault();
    const { title, content, difficulty, output, tests } = this.state;
    const id = localStorage.getItem('id');
    const body = {
      title,
      content,
      difficulty,
      user_id: id,
      type: 0
    }
    try {
      const result = await axios.post('http://localhost:3396/api/challenges/addChallenge', body);
      if(result) {
        const userBody = {
          user_id: id,
          challenge_id: result.data[0].id,
          type: 0
        }
        try {
          const userResult = await axios.post('http://localhost:3396/api/usersChallenges', userBody);
        } catch(userErr) {
          throw new Error(userErr);
        }
        const testBody = {
          content: tests,
          output: output,
          challenge_id: result.data[0].id,
        }
        try {
          const testResult = await axios.post('http://localhost:3396/api/testCases', testBody);
          testResult ? this.props.history.push('/home') : this.props.history.push('/addChallenge');
        } catch(testError) {
          throw new Error(testError);
        }
      }
    } catch(err) {
      throw new Error(err);
    }
  }

  handleChallengeInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="login-form-container">
      <EditorHeader history={this.props.history} />
      <br/>
        <form className="auth-form">
          <div className="left-form">
            <Input
              name='title'
              type='title'
              placeholder={'enter title'}
              onChange={this.handleChallengeInput}
              />
              <br/>
              <br/>
            <Input 
              name='output'
              type='output'
              placeholder={'enter expected output'}
              onChange={this.handleChallengeInput}
              />
            <br/>
            <br/>
            <Input
              name='difficulty'
              type='difficulty'
              placeholder={'enter your difficulty'}
              onChange={this.handleChallengeInput}
              />
          </div>
          <div className="right-form">
            <TextArea
              name='content'
              type='content'
              cols={75}
              rows={15}
              resize="none"
              placeholder={'enter content'}
              onChange={this.handleChallengeInput}
              />
              <br/>
              <br/>
            <TextArea
              name='tests'
              type='tests'
              cols={75}
              rows={15}
              resize="none"
              placeholder={'enter tests'}
              onChange={this.handleChallengeInput}
              />
          </div>
          <br/> <br/> <br/> <br/> <br/> <br/>
          <Button
            backgroundColor="red"
            color="white"
            text="Add Challenge"
            onClick={(e) => this.submitChallenge(e)}
            />
        </form>
      </div>
    );
  }
}

export default AddChallenge;
