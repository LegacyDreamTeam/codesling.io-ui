import React from 'react';

import './TextArea.css';

const TextArea = ({
  type,
  name,
  onChange,
  placeholder,
  cols,
  rows,
  resize
}) => {
  return (
    <textarea
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      cols={cols}
      rows={rows}
      resize={resize}
    ></textarea>
  );
};

export default TextArea;
