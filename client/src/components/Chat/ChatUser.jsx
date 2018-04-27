import React from 'react'; 
import './Chat.css'; 
import io from 'socket.io-client/dist/socket.io.js';


class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMsg: '', 
      messages: [],
      player: this.props.player
    }
    this.handleSubmit= this.handleSubmit.bind(this); 
  }
  
  // componentDidMount() { 
  //   this.socket.on('receive-message', (msg) => {
  //     console.log(msg);
  //     let messages = context.state.messages; 
  //     messages.push(`${msg.user.toUpperCase()}:  ${msg.message}`);
  //     this.setState({messages: messages});
  //   });
  // }
  componentDidMount() {
    const { socket, player } = this.props; 
    this.setState({player: player})
    socket.on('server.message', (msg) => {
      console.log('FROM SERVER =>', msg)
      let messages = this.state.messages; 
      messages.push(`Player${msg.player} : ${msg.msg}`);
      this.setState({messages: messages});
    });
  }

  handleCurrentMsg(e) {
    this.setState({currentMsg: e.target.value});
  }

  handleSubmit(event) {
    const { socket } = this.props;
    socket.emit('client.message', {player: this.state.player, msg: this.state.currentMsg });
    this.setState({currentMsg: ''});
    event.preventDefault(); 
  }

  render() {
    return ( 
      <div className='chat-box'>
        <div className='messages-box'>
          {
            this.state.messages.length > 0 ? 
              (
                this.state.messages.map(msg =>
                  <div className='each-msg'> 
                    {msg}
                  </div>
                ))
              :
              (
                null
              )
          }
        </div>
        <div className='send-msg'>
          <form onSubmit={this.handleSubmit}>
            <input size='30' type='text' placeholder='Type your message' value={this.state.currentMsg} onChange={this.handleCurrentMsg.bind(this)} /> 
            <input className='button' type='submit' value='Submit' />
          </form>
        </div> 
      </div>
    );
  }
};

export default Chat; 