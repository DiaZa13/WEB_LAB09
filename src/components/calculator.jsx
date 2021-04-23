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
    first: '0',
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
  const [display, setDisplay] = useState('0');

  // Make an operation
  const operate = () => {
    console.log('Starts testing');
    console.log(negative.first);
    console.log(negative.second);
    console.log(numbers.first);
    console.log(numbers.second);
    if (numbers.second !== '') {
      // Check if the numbers are negative and parse them into float
      let first;
      let second;
      let value;
      if (negative.first) {
        first = -parseFloat(numbers.first);
        second = parseFloat(numbers.second);
      } else if (negative.second) {
        first = parseFloat(numbers.first);
        second = -parseFloat(numbers.second);
      } else {
        first = parseFloat(numbers.first);
        second = parseFloat(numbers.second);
      }
      // Operate the numbers
      if (operations.multiplication) {
        value = (first * second);
      } else if (operations.addition) {
        console.log('convertidos');
        console.log(first);
        console.log(second);
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
    } else if (negative.first) {
      const firstN = -parseFloat(numbers.first);
      setNumbers({
        first: firstN,
        second: '',
      });
    } else if (negative.second) {
      const secondN = -parseFloat(numbers.second);
      setNumbers({
        ...numbers,
        second: secondN,
      });
    } else if (!negative.first) {
      const firstN = Math.abs(parseFloat(numbers.first));
      setNumbers({
        ...numbers,
        first: firstN,
      });
    } else if (!negative.second) {
      const secondN = parseFloat(numbers.second);
      setNumbers({
        ...numbers,
        second: secondN,
      });
    } else {
      setDisplay('');
    }
    setNegative({
      first: false,
      second: false,
    });
  };

  const calculate = (key) => {
    if (key.keyValue === 'C') {
      setNumbers({
        ...numbers,
        first: '0',
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
      setDisplay('0');
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
      if (key.keyValue === '+/-' && numbers.first !== '0' && display !== '0') {
        console.log('wtf');
        setPlusMinus(!plusMinus);
        setPlusMinus((state) => {
          if (state) {
            setPlusMinus(state);
            if (display === numbers.first) {
              setNegative({
                first: true,
                second: false,
              });
            } else {
              setNegative({
                second: true,
                first: false,
              });
            }
            setDisplay(`-${display}`);
          } else {
            console.log('wtf1');
            setPlusMinus(state);
            setNegative({
              first: false,
              second: false,
            });
            setDisplay(display.replace('-', ''));
          }
        });
      } else if (key.keyValue !== '+/-') {
        // eslint-disable-next-line max-len
        if (!operations.addition && !operations.division && !operations.multiplication && !operations.subtraction && !operations.module) {
          if (numbers.first === '0' && display === '0') {
            if (key.keyValue === '.') {
              setNumbers({
                ...numbers,
                first: numbers.first + key.keyValue.toString(),
              });
              setDisplay(display + key.keyValue.toString());
            } else {
              setNumbers({
                ...numbers,
                first: key.keyValue.toString(),
              });
              setDisplay(key.keyValue.toString());
            }
          } else {
            console.log('wtf1.2');
            setNumbers({
              ...numbers,
              first: numbers.first + key.keyValue.toString(),
            });
            setDisplay(display + key.keyValue.toString());
          }
        } else if (display === numbers.first) {
          setNumbers({
            ...numbers,
            second: numbers.second + key.keyValue.toString(),
          });
          setDisplay(key.keyValue.toString());
        } else if (display === 'ERROR') {
          setNumbers({
            ...numbers,
            first: key.keyValue.toString(),
          });
          setDisplay(key.keyValue.toString());
        } else {
          console.log('wtf2');
          setNumbers({
            ...numbers,
            second: numbers.second + key.keyValue.toString(),
          });
          setDisplay(display + key.keyValue.toString());
        }
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex flex-row flex-wrap calculator">
        <Display
          pminus={ plusMinus }
          operacion={
            operations.addition ? 'Suma'
              : operations.subtraction ? 'Resta'
                : operations.multiplication ? 'Multiplicación'
                  : operations.division ? 'División'
                    : operations.module ? 'MOD' : 'Operación'
          }
          value={display}
          accumulate={numbers.first}
        />
        <Keyboard
          calculate={(key) => { calculate(key); }}
        />
      </div>
      <div data-testid="hooks">{numbers.first}</div>

    </div>
  );
}

export default Calculator;
