import React from 'react';
import Logo from '../Logo';

import EditorNavbar from './EditorNavbar';

import './EditorHeader.css';

const EditorHeader = (props) => (
  <div className="editor-header">
    <div className="logo-container">
      <Logo history={props.history}/>
    </div>
    <div className="navbar-container">
      <EditorNavbar history={props.history} />
    </div>
  </div>
);

export default EditorHeader;
