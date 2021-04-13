import React, { useState } from 'react';
import Display from './display';
import Keyboard from './keyboard';

function Calculator() {
  // Defines the operation
  const [operations, setOperations] = useState({
    addition: false,
    subtraction: false,
    multiplication: false,
    division: false,
    module: false,
  });
  // Save the numbers to use in the operation
  const [numbers, setNumbers] = useState({
    first: '',
    second: '',
  });
  // Defines if a number is negative
  const [negative, setNegative] = useState({
    first: false,
    second: false,
  });
  // Convert a number into a negative number
  const [plusMinus, setPlusMinus] = useState(false);
  // Defines the data to display
  const [display, setDisplay] = useState('');

  // Make an operation
  const operate = () => {
    if (numbers.second !== '') {
      // Check if the numbers are negative and parse them into float
      let first;
      let second;
      let value;
      if (negative.first) {
        first = -parseFloat(numbers.first);
      } else if (negative.second) {
        second = -parseFloat(numbers.second);
      } else {
        first = parseFloat(numbers.first);
        second = parseFloat(numbers.second);
      }
      // Operate the numbers
      if (operations.multiplication) {
        value = (first * second);
      } else if (operations.addition) {
        value = (first + second);
      } else if (operations.subtraction) {
        value = (first - second);
      } else if (operations.division) {
        value = (first / second);
      } else if (operations.module) {
        value = (first % second);
      }
      const decimal = value % 1;
      if (decimal > 0) {
        value = value.toFixed(2);
      }
      // Check if the result is less than 9 digits or less than 999999999
      if (value <= 999999999 && value.toString().length < 9) {
        setNumbers({
          first: value.toString(),
          second: '',
        });
        if (!plusMinus && value < 0) {
          setDisplay('ERROR');
          setNumbers({
            ...numbers,
            first: '',
            second: '',
          });
        } else {
          setDisplay(value.toString());
        }
      } else {
        console.log('ERROR');
      }
    } else {
      setDisplay('');
    }
  };

  const calculate = (key) => {
    if (key.keyValue === 'C') {
      setNumbers({
        ...numbers,
        first: '',
        second: '',
      });
      setOperations({
        ...operations,
        addition: false,
        subtraction: false,
        multiplication: false,
        division: false,
        module: false,
        plus_minus: false,
      });
      setDisplay('');
    } else if (key.keyValue === '*') {
      setOperations({
        ...operations,
        multiplication: true,
        addition: false,
        subtraction: false,
        division: false,
        module: false,
      });
      setDisplay('');
      operate();
    } else if (key.keyValue === '+') {
      setOperations({
        ...operations,
        addition: true,
        multiplication: false,
        subtraction: false,
        division: false,
        module: false,
      });
      setDisplay('');
      if (numbers.first === '') {
        setNumbers({
          ...numbers,
          first: '0',
        });
        setDisplay('0');
        setDisplay((state) => {
          setDisplay(state);
        });
      }
      operate();
    } else if (key.keyValue === '-') {
      setOperations({
        ...operations,
        subtraction: true,
        addition: false,
        multiplication: false,
        division: false,
        module: false,
      });
      setDisplay('');
      if (numbers.first === '') {
        setNumbers({
          ...numbers,
          first: '0',
        });
        setDisplay('0');
        setDisplay((state) => {
          setDisplay(state);
        });
      }
      operate();
    } else if (key.keyValue === '÷') {
      setOperations({
        ...operations,
        division: true,
        addition: false,
        multiplication: false,
        subtraction: false,
        module: false,
      });
      setDisplay('');
      if (numbers.first === '') {
        setNumbers({
          ...numbers,
          first: '0',
        });
        setDisplay('0');
        setDisplay((state) => {
          setDisplay(state);
        });
      }
      operate();
    } else if (key.keyValue === 'MOD') {
      setOperations({
        ...operations,
        module: true,
        division: false,
        addition: false,
        multiplication: false,
        subtraction: false,
      });
      setDisplay('');
      if (numbers.first === '') {
        setNumbers({
          ...numbers,
          first: '0',
        });
        setDisplay('0');
        setDisplay((state) => {
          setDisplay(state);
        });
      }
      operate();
    } else if (key.keyValue === '=') {
      operate();
    } else if (display.length < 9) {
      // eslint-disable-next-line max-len
      if (!operations.addition && !operations.division && !operations.multiplication && !operations.subtraction && !operations.module) {
        setNumbers({
          ...numbers,
          first: numbers.first + key.keyValue.toString(),
        });
        setDisplay(display + key.keyValue.toString());
      } else if (display === numbers.first) {
        console.log('aqui');
        setNumbers({
          ...numbers,
          second: numbers.second + key.keyValue.toString(),
        });
        setDisplay(key.keyValue.toString());
      } else {
        setNumbers({
          ...numbers,
          second: numbers.second + key.keyValue.toString(),
        });
        setDisplay(display + key.keyValue.toString());
      }
      if (key.keyValue === '+/-') {
        setPlusMinus(!plusMinus);
        if (display === numbers.first) {
          setNegative({
            first: true,
          });
        } else {
          setNegative({
            second: true,
          });
        }
        setDisplay(`-${display}`);
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex flex-row flex-wrap calculator">
        <Display
          value={display}
          accumulate={numbers.first}
        />
        <Keyboard
          calculate={(key) => { calculate(key); }}
        />
      </div>

    </div>
  );
}

export default Calculator;
