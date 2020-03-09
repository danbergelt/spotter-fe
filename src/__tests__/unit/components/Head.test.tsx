import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Head from 'src/components/lib/Head';
import '@testing-library/jest-dom/extend-expect';

describe('head utility component', () => {
  test('renders', () => {
    const { getByTestId } = render(<Head setState={() => {}} />);

    getByTestId(/close/i);
  });

  test('calls setter func on X click', () => {
    const setState = jest.fn();
    const { getByTestId } = render(<Head setState={setState} />);

    fireEvent.click(getByTestId(/close/i));

    expect(setState).toHaveBeenCalledTimes(1);
  });

  test('can set size of X', () => {
    const { getByTestId } = render(<Head setState={() => {}} size={999} />);
    expect(getByTestId(/x/i)).toHaveAttribute('size', '999');
  });
});
