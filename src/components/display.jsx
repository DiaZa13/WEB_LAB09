import React from 'react';

function Display(props) {
  const display = props;
  return (
    <div className="d-flex flex-column display">
      <div className="bg-dark h-25 d-flex justify-content-between align-items-center" style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
        <h3 className="ml-3 mt-1 font-weight-bold">
          CALCULATOR
        </h3>
        <h3 className="mr-4 mt-1 font-weight-bold">
          {display.operacion}
        </h3>
      </div>
      <div className="d-flex flex-column bg-display h-75 justify-content-flex-end">
        <h4 className="align-self-end mr-4 mt-2 mb-1 font-weight-normal text-light">
          {display.accumulate}
        </h4>
        <h1 className="align-self-end mr-4 font-weight-normal">
          {display.value}
        </h1>
      </div>
    </div>

  );
}

export default Display;
