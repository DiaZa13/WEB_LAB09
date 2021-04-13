import React from 'react';

function Key(props) {
  const key = props;
  return (
    <button onClick={key.calculate} type="button" className={`btn ${key.color} key border-dark`} style={{ '--keyMinWidth': `${key.width}` }} value={`${key.keyValue}`}>
      {key.keyValue}
    </button>
  );
}

export default Key;
