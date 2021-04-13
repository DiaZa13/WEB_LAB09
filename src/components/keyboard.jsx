import React from 'react';
import KeyItem from './keyItem';
import Key from '../utils/key.json';

function Keyboard(props) {
  const prop = props;
  const keys = Key;
  return (
    <div className="row row-cols-4 m-0">
      {
        keys.map((key) => {
          const index = keys.indexOf(key);
          return (
            <KeyItem
              key={index}
              color={key.color}
              width={key.width}
              keyValue={key.keyValue}
              calculate={() => prop.calculate(key)}
            />
          );
        })
        }
    </div>
  );
}

export default Keyboard;
