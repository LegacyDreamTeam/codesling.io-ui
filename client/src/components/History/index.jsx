import React, { Component } from 'react';
import axios from 'axios';
import EditorHeader from '../globals/EditorHeader'

import { HistoryList } from './HistoryList.jsx';

class History extends Component {
  state = {
    history: []
  }

  async componentDidMount() {
    const id = localStorage.getItem('id');
    const { data } = await axios.get(`http://localhost:3396/api/history/fetchAllHistory/${id}`);
    this.setState({ history: data });
  }
  
  render() {
    return (
      <div>
      <EditorHeader history={this.props.history} />
      <br/>
      <HistoryList history={this.state.history}/>
      </div>
    );
  }
}

export default History;
