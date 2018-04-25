import React, { Component } from 'react';
import Button from '../globals/Button/';
import './Auth.css';

export default class Logout extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout() {
    localStorage.clear();
    this.props.history.push('/');
  }

  render() {
    return (
      <li onClick={this.logout}>Logout</li>
    )
  }
}