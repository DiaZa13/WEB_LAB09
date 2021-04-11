import React from 'react';

function Key(props) {
  const key = props;
  return (
    <button onClick={key.displayChange} type="button" className={`btn ${key.color} key`} style={{ '--keyMinWidth': `${key.width}`, '--keyFontSize': `${key.font}` }} value={`${key.keyValue}`}>
      {key.keyValue}
    </button>
  );
}

export default Key;
