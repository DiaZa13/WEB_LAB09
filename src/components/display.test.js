import React from 'react';
import {
  screen, render, cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Display from './display';

describe('Display', () => {
  let props = {
    pminus: true
  }

  it('Negative numbers on', function () {
    render(<Display pminus={props.pminus} />);
    let negative;
    negative = screen.queryByTestId("negative");
    screen.debug();
    expect(negative).not.toBeNull();
    expect(screen.getByText('Negativos: on')).toBeInTheDocument();
  });


});
