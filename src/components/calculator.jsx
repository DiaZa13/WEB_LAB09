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
      value = (first * second).toFixed(3);
    } else if (operations.addition) {
      console.log('testing');
      console.log(first);
      console.log(second);
      value = (first + second);
      console.log(value);
    } else if (operations.subtraction) {
      value = (first - second);
    } else if (operations.division) {
      value = (first / second).toFixed(3);
    } else if (operations.module) {
      value = (first % second).toFixed(3);
    }

    // Check if the result is less than 9 digits or less than 999999999
    if (value <= 999999999 && value.toString().length < 9) {
      setNumbers({
        first: value.toString(),
        second: '',
      });
      if (!plusMinus && value < 0) {
        setDisplay('ERROR');
      } else {
        setDisplay(value.toString());
      }
    } else {
      setDisplay(numbers.first);
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
      } else {
        console.log('Deberia entrar aqui');
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
    <div className="container-fluid mt-4">
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
