import React from 'react';
import KeyItem from './keyItem';
import Key from '../utils/key.json';

function Keyboard(props) {
  const prop = props;
  const keys = Key;
  return (
    <div className="w-100">
      <div className="row row-cols-4 m-0 h-80">
        {
          keys.map((key) => {
            const index = keys.indexOf(key);
            if (index < 16) {
              return (
                <KeyItem
                  key={index}
                  testid={key.test}
                  color={key.color}
                  width={key.width}
                  keyValue={key.keyValue}
                  calculate={() => prop.calculate(key)}
                />
              );
            }
          })
        }
      </div>
      <div className="row m-0 h-20">
        {
          keys.map((key) => {
            const index = keys.indexOf(key);
            if (index > 15) {
              return (
                <KeyItem
                  key={index}
                  testid={key.test}
                  color={key.color}
                  width={key.width}
                  keyValue={key.keyValue}
                  calculate={() => prop.calculate(key)}
                />
              );
            }
          })
        }
      </div>
    </div>

  );
}

export default Keyboard;
