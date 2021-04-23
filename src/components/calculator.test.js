import React from 'react';
import {
  screen, render, cleanup, fireEvent
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Calculator from './calculator';
import Display from './display';


describe('Display', () => {

  afterEach(cleanup);

  let props = {
    pminus: true
  }

  let mockNumbers = {
    first: '0',
    second: '',
  };

  jest.mock('react', () =>{
    return jest.fn(() => {
      numbers: mockNumbers
    })
  })

  it('Negative numbers on', function () {
    render(<Display pminus={props.pminus} />);
    let negative;
    negative = screen.queryByTestId("negative");
    expect(negative).not.toBeNull();
    expect(screen.getByText('Negativos: on')).toBeInTheDocument();
  });

  it('Addition', function () {
    render(<Calculator />);
    let plus = screen.getByTestId('plus');
    let seven = screen.getByTestId('seven');
    let five = screen.getByTestId('five');
    let equals = screen.getByTestId('equals');
    fireEvent.click(seven);
    fireEvent.click(plus);
    fireEvent.click(five);
    fireEvent.click(equals);
    let count = screen.getByTestId('operation');
    let display = screen.getByTestId('display');
    expect(count).toHaveTextContent("Suma");
    expect(display).toHaveTextContent("12");
  });

  it('Subtraction error', function () {
    render(<Calculator />);
    let subtraction = screen.getByTestId('minus');
    let seven = screen.getByTestId('seven');
    let five = screen.getByTestId('five');
    let equals = screen.getByTestId('equals');
    fireEvent.click(five);
    fireEvent.click(subtraction);
    fireEvent.click(seven);
    fireEvent.click(equals);
    let count = screen.getByTestId('operation');
    let display = screen.getByTestId('display');
    expect(count).toHaveTextContent("Resta");
    expect(display).toHaveTextContent("ERROR");
  });

  it('Accepts negative numbers', function () {
    render(<Calculator />);
    let subtraction = screen.getByTestId('minus');
    let seven = screen.getByTestId('seven');
    let five = screen.getByTestId('five');
    let equals = screen.getByTestId('equals');
    let negative = screen.getByTestId('plus_minus')
    fireEvent.click(five);
    fireEvent.click(negative)
    fireEvent.click(subtraction);
    fireEvent.click(seven);
    fireEvent.click(equals);
    let count = screen.getByTestId('operation');
    let display = screen.getByTestId('display');
    expect(count).toHaveTextContent("Resta");
    expect(display).toHaveTextContent("-12");
  });

  it('Multiplication', function () {
    render(<Calculator />);
    let multiplication = screen.getByTestId('product');
    let seven = screen.getByTestId('seven');
    let five = screen.getByTestId('five');
    let equals = screen.getByTestId('equals');
    fireEvent.click(five);
    fireEvent.click(multiplication);
    fireEvent.click(seven);
    fireEvent.click(equals);
    let count = screen.getByTestId('operation');
    let display = screen.getByTestId('display');
    expect(count).toHaveTextContent("Multiplicación");
    expect(display).toHaveTextContent("35");
  });

  it('Division and concatenating 2 numbers', function () {
    render(<Calculator />);
    let division = screen.getByTestId('division');
    let seven = screen.getByTestId('seven');
    let zero = screen.getByTestId('zero');
    let five = screen.getByTestId('five');
    let equals = screen.getByTestId('equals');
    fireEvent.click(seven);
    fireEvent.click(zero);
    fireEvent.click(division);
    fireEvent.click(five);
    fireEvent.click(equals);
    let count = screen.getByTestId('operation');
    let display = screen.getByTestId('display');
    expect(count).toHaveTextContent("División");
    expect(display).toHaveTextContent("14");
  });

  it('Conditioning inexact division, 2 significant decimals', function () {
    render(<Calculator />);
    let division = screen.getByTestId('division');
    let seven = screen.getByTestId('seven');
    let five = screen.getByTestId('five');
    let equals = screen.getByTestId('equals');
    fireEvent.click(five);
    fireEvent.click(division);
    fireEvent.click(seven);
    fireEvent.click(equals);
    let count = screen.getByTestId('operation');
    let display = screen.getByTestId('display');
    expect(count).toHaveTextContent("División");
    expect(display).toHaveTextContent("0.71");
  });

  it('Evaluating operations with floats', function () {
    render(<Calculator />);
    let division = screen.getByTestId('division');
    let two = screen.getByTestId('two');
    let four = screen.getByTestId('four');
    let five = screen.getByTestId('five');
    let seven = screen.getByTestId('seven');
    let point = screen.getByTestId('point');
    let equals = screen.getByTestId('equals');
    fireEvent.click(seven);
    fireEvent.click(four);
    fireEvent.click(point);
    fireEvent.click(two);
    fireEvent.click(five);
    fireEvent.click(division);
    fireEvent.click(two);
    fireEvent.click(point);
    fireEvent.click(seven);
    fireEvent.click(equals);
    let count = screen.getByTestId('operation');
    let display = screen.getByTestId('display');
    expect(count).toHaveTextContent("División");
    expect(display).toHaveTextContent("27.50");
  });

  it('Multiple operations without equals button', function () {
    render(<Calculator />);
    let display = screen.getByTestId('display');;
    let division = screen.getByTestId('division');
    let multiplication = screen.getByTestId('product');
    let subtraction = screen.getByTestId('minus');
    let two = screen.getByTestId('two');
    let three = screen.getByTestId('three');
    let four = screen.getByTestId('four');
    let five = screen.getByTestId('five');
    let seven = screen.getByTestId('seven');
    let eight = screen.getByTestId('eight');
    let point = screen.getByTestId('point');
    let equals = screen.getByTestId('equals');
    fireEvent.click(seven);
    fireEvent.click(four);
    fireEvent.click(point);
    fireEvent.click(two);
    fireEvent.click(five);
    fireEvent.click(division);
    fireEvent.click(two);
    fireEvent.click(point);
    fireEvent.click(seven);
    fireEvent.click(multiplication);
    expect(display).toHaveTextContent("27.50");
    fireEvent.click(three)
    fireEvent.click(point);
    fireEvent.click(eight);
    fireEvent.click(subtraction)
    expect(display).toHaveTextContent("104.5");
    fireEvent.click(seven);
    fireEvent.click(eight);
    fireEvent.click(equals);
    expect(display).toHaveTextContent("26.5");
  });

});
