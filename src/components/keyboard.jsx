import React from 'react';
import KeyItem from './keyItem';
import Key from '../utils/key.json';

function Keyboard(props) {
  const prop = props;
  const keys = Key;
  return (
    <div className="d-flex flex-wrap">
      {
        keys.map((key) => {
          const index = keys.indexOf(key);
          return (
            <KeyItem
              key={index}
              color={key.color}
              width={key.width}
              keyValue={key.keyValue}
              displayChange={() => prop.displayChange(key.keyValue)}
            />
          );
        })
        }
    </div>
  );
}

export default Keyboard;
