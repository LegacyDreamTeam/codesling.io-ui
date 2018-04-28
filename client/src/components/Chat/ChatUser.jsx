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
  
  componentDidMount() {
    const { socket, player } = this.props; 
    this.setState({player: player})
    socket.on('server.message', (msg) => {
      let messages = this.state.messages; 
      messages.push(`${msg.player}  ${msg.username} : ${msg.msg}`);
      this.setState({messages: messages});
      console.log('Messages', this.state.messages);
      console.log('Props', this.props);
    });
    
  }
  
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  handleCurrentMsg(e) {
    this.setState({currentMsg: e.target.value});
  }

  handleSubmit(event) {
    const { socket } = this.props;
    socket.emit('client.message', {player: this.state.player, username: localStorage.username, msg: this.state.currentMsg });
    this.setState({currentMsg: ''});
    event.preventDefault(); 
    this.scrollToBottom();
  }

  render() {
    return ( 
      <div className='chat-box'>
        <div className='messages-box'>
          {
            this.state.messages.length > 0 ? 
              (
                this.state.messages.map(msg =>
                  Number(msg[0][0]) === 1 ? 
                  (
                  <div className='each-msg-player1 wordwrap'> 
                    <span className='inner wordwrap'>{msg.slice(3)}</span>
                  </div>
                  )
                  :
                  (
                  <div className='each-msg-player2 wordwrap'> 
                    <div className='inner wordwrap'>{msg.slice(3)}</div>
                  </div>
                  )
                ))
              :
              (
                null
              )
          }
        <div style={{ float:"left", clear: "both", marginTop: "50px"}} 
          ref={(el) => { this.messagesEnd = el; }}/>  
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