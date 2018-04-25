import React from 'react';

import codeslingLogo from './codesling-logo.svg';

const Logo = ({
  className,
  history
}) => {
  return (
    <img 
      alt="Codesling.io Logo"
      className={`logo ${className ? className : ''}`}
      src={codeslingLogo}
      onClick={()=> history.push('./home')}
    />
  );
};

export default Logo;
