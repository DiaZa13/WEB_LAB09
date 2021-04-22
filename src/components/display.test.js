import React from 'react';
import {
  screen, render, cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Display from './display';

describe('Display', () => {
  let negative
  beforeAll(() => {
    render(<Display />);
    negative = screen.getByTestId('negative');
    console.log(negative);
  });
});

it('Primer test', function () {
  expect(negative).toBeDefined()
});
