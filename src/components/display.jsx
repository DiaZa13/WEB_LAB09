import React from 'react';

function Display(props) {
  const display = props;
  return (
    <div className="d-flex flex-column display">
      <div className="bg-dark" style={{ height: '40px', borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
        <h4 className="ml-3 mt-1 font-weight-bold">
          CALCULATOR
        </h4>
      </div>
      <div className="d-flex flex-column  bg-display" style={{ height: '85px' }}>
        <p className="align-self-end mr-4 mt-2 mb-1 font-weight-normal text-light">
          {display.accumulate}
        </p>
        <h1 className="align-self-end mr-4 font-weight-normal">
          {display.value}
        </h1>
      </div>
    </div>

  );
}

export default Display;
