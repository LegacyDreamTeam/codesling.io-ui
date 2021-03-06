import React, { Component } from 'react';
import CodeMirror from 'react-codemirror2';
import io from 'socket.io-client/dist/socket.io.js';
import axios from 'axios';
import { throttle } from 'lodash';
import Chat from '../Chat/ChatUser.jsx'; 

import Stdout from './StdOut/index.jsx';
import EditorHeader from '../globals/EditorHeader';
import Button from '../globals/Button';

import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/base16-dark.css';
import './Sling.css';

let windowId;
let windowChallengeId;

window.onbeforeunload =  function() {
  if(windowId) {
    axios.post('http://localhost:3396/api/challenges/leavingPage', { id: windowId, challengeId: windowChallengeId });
    return null;
  }
}

class Sling extends Component {
  state = {
    id: null,
    ownerText: null,
    challengerText: null,
    text: '',
    challenge: '',
    stdout: '',
    start: false,
    challengerId: null,
    gameOver: false,
  }
  

  componentWillUnmount() {
    axios.post('http://localhost:3396/api/challenges/leavingPage', { id: windowId, challengeId: windowChallengeId });
  }

  componentDidMount() {
    const { socket, challenge, player, roomId, challengeId } = this.props;
    const startChall = typeof challenge === 'string' ? JSON.parse(challenge) : {}
    console.log(startChall);
    windowId = roomId;
    windowChallengeId = challengeId;
    socket.on('connect', () => {
      socket.emit('client.ready', { challenge: startChall, player });

    });

    
    socket.on('server.initialState', ({ id, playerOneText, playerTwoText, challenge }) => {
      this.setState({
        id,
        ownerText: playerOneText,
        challengerText: playerTwoText,
        challenge
      });
      console.log('ID', id)
    });

    socket.on('server.startGame', ({ start }) => {
      this.setState({ start: start });
      socket.emit('client.getUser', { userId: localStorage.id });
    });

    socket.on('server.PlayerIds', ({ userId }) => {
      if (userId !== localStorage.id) {
        this.setState({ challengerId: userId });
      }
    });

    socket.on('serverOne.changed', ({ text, player }) => {
      this.setState({ ownerText: text, player1: player});
    });

    socket.on('serverTwo.changed', ({ text, player }) => {
      this.setState({ challengerText: text, player2: player });
    });

    socket.on('server.run', ({ stdout, player, winner }) => {
      this.props.player === player ? this.setState({ stdout }) : null;
      if (winner) {
        this.onWin(player);
      }
    });

    window.addEventListener('resize', this.setEditorSize);
  }

  submitCode = () => {
    if(!this.state.gameOver) {
      const { socket, player, challenge } = this.props;
      const { ownerText, challengerText } = this.state;
      if (player === 1) {
        socket.emit('client.run', { text: ownerText, player, challenge });
      } else {
        socket.emit('client.run', { text: challengerText, player, challenge });
      }
    } else {
      alert('The game is already over. Please play again!');
    }
  }

  onWin = async (player) => { // player is either 1 or 2
    var iWin = player === this.props.player ? 1 : 0;
    var body = {
      outcome: iWin,
      time: new Date(),
      clout: iWin ? 5 : -1,
      user_id: localStorage.id,
      challenger_id: this.state.challengerId,
      challenge_id: this.props.challengeId,
    }
    console.log(body)
    try {
      const data = await axios.post(`http://localhost:3396/api/history/addHistory`, body);
      this.setState({ gameOver: true });
      if (iWin) {
        alert('Congratulations! Your solution is correct and you win the game!');
      } else {
        alert(`Your opponent has won. Please try another challenge!

              "I've failed over and over and over again in my life.
              And that is why I succeed." - Michael Jordan`);
      }
    } catch (err) {
      throw new Error(err);
    }
    // make sure to kill the game so that no more submissions can happen
  }

  handleChange = throttle((editor, metadata, value) => {
    const { player } = this.props;
    player === 1 ? this.props.socket.emit('clientOne.update', { text: value, player }) : this.props.socket.emit('clientTwo.update', { text: value, player });
  }, 250)

  setEditorSize = throttle(() => {
    this.editor.setSize(null, `${window.innerHeight - 80}px`);
  }, 100);

  initializeEditor = (editor) => {
    this.editor = editor;
    this.setEditorSize();
  }

  render() {
    const { socket, player, history } = this.props;
    if (player === 1) {
      return (
        <div className="sling-container">
          <EditorHeader history={history} />
          <div className="code1-editor-container">
            <CodeMirror
              editorDidMount={this.initializeEditor}
              value={this.state.ownerText}
              options={{
                mode: 'javascript',
                lineNumbers: true,
                theme: 'base16-dark',
              }}
              onChange={this.handleChange}
              />
          </div>
          <div className="stdout-container">
            { this.state.start ?
            <div>
              {this.state.challenge.title || this.props.challenge.title}
              <br/>
              {this.state.challenge.content || this.props.challenge.content}
            </div> :
            <div>
              Waiting for opponent...
            </div>
            }
            <Stdout text={this.state.stdout}/>
            <Button
              className="run-btn"
              text="Run Code"
              backgroundColor="red"
              color="white"
              onClick={() => this.submitCode()}
            />
            <Button
              className="run-btn"
              text="Add Friend"
              backgroundColor="red"
              color="white"
              onClick={() => this.submitCode()}
            />
            <div></div>
            <div >
              <Chat socket={socket} id={this.state.id} player={player}/> 
            </div>
          </div>
          <div className="code2-editor-container">
            <CodeMirror 
              editorDidMount={this.initializeEditor}
              value={this.state.challengerText}
              options={{
                mode: 'javascript',
                lineNumbers: true,
                theme: 'base16-dark',
                readOnly: true,
              }}
            />
          </div>
        </div>
      )
    } else {
      return (
        <div className="sling-container">
          <EditorHeader history={this.props.history} />
          <div className="code1-editor-container">
            <CodeMirror
              editorDidMount={this.initializeEditor}
              value={this.state.ownerText}
              options={{
                mode: 'javascript',
                lineNumbers: true,
                theme: 'base16-dark',
                readOnly: true
              }}
              />
          </div>
          <div className="stdout-container">
              {this.state.challenge.title || this.props.challenge.title}
              <br/>
              {this.state.challenge.content || this.props.challenge.content}
            <Stdout text={this.state.stdout}/>
            <Button
              className="run-btn"
              text="Run Code"
              backgroundColor="red"
              color="white"
              onClick={() => this.submitCode()}
            />
            <button
              className="run-btn"
              text="Add Friend"
              backgroundColor="red"
              color="white"
              onClick={() => this.submitCode()}>Add Friend</button>
            <div >
              <Chat socket={socket} id={this.state.id} player={player}/> 
            </div>
          </div>
          <div className="code2-editor-container">
            <CodeMirror 
              editorDidMount={this.initializeEditor}
              value={this.state.challengerText}
              options={{
                mode: 'javascript',
                lineNumbers: true,
                theme: 'base16-dark'
              }}
              onChange={this.handleChange}
            />
          </div>
        </div>
      )
    }
  }
}

export default Sling;
