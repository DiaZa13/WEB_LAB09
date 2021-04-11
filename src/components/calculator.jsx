import React, { useState } from 'react';
import Display from './display';
import Keyboard from './keyboard';

function Calculator() {
  const [display, setDisplay] = useState('');

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex flex-row flex-wrap calculator">
        <Display
          value={display}
        />
        <Keyboard
          displayChange={(value) => { setDisplay(value); }}
        />
      </div>

    </div>
  );
}

export default Calculator;
