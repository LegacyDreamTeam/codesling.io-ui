import React from 'react';
import Logout from '../../Auth/Logout.jsx'
import Button from '../Button';

const EditorNavbar = (props) => (
  <nav className="editor-navbar">
    <ul>
      <li onClick={() => props.history.push('/challenge')}>My Challenges</li>
      <li onClick={() => props.history.push('/history')}>My History</li>
      <Logout history={props.history}/>
    </ul>
  </nav>
);

export default EditorNavbar;
