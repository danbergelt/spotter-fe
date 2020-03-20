import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import HTTPResponse from 'src/components/lib/HTTPResponse';

describe('HTTP response utility component', () => {
  test('can render HTTP response w/ error', () => {
    const { queryByText } = render(<HTTPResponse error='foo' />);
    expect(queryByText(/foo/i)).toBeTruthy();
  });

  test('can render HTTP response w/ success', () => {
    const { queryByText } = render(<HTTPResponse success='bar' />);
    expect(queryByText(/bar/i)).toBeTruthy();
  });

  test('renders nothing if no HTTP response', () => {
    const { queryByTestId } = render(<HTTPResponse />);
    expect(queryByTestId(/res/i)).toBeFalsy();
  });

  test('can fire reset function on click (with error)', () => {
    const reset = jest.fn();
    const { queryByText, getByTestId } = render(
      <HTTPResponse error='foo' reset={reset} />
    );
    expect(queryByText(/foo/i)).toBeTruthy();
    const x = getByTestId(/close/i);
    fireEvent.pointerUp(x);
    expect(reset).toHaveBeenCalledTimes(1);
  });

  test('can fire reset function on click (with success)', () => {
    const reset = jest.fn();
    const { queryByText, getByTestId } = render(
      <HTTPResponse success='foo' reset={reset} />
    );
    expect(queryByText(/foo/i)).toBeTruthy();
    const x = getByTestId(/close/i);
    fireEvent.pointerUp(x);
    expect(reset).toHaveBeenCalledTimes(1);
  });
});
