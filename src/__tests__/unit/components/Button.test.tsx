import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from 'src/components/util/Button';

describe('button utility component', () => {
  test('can render button', () => {
    const { getByText } = render(<Button content='foo' />);

    expect(getByText(/foo/i)).toBeTruthy();
  });

  test('can render loader on loading state', () => {
    const { getByTestId } = render(<Button content='foo' loading={true} />);

    expect(getByTestId(/loader/i)).toBeTruthy();
  });

  test('can call passed-in func', () => {
    const func = jest.fn();
    const { getByTestId } = render(
      <Button content='foo' loading={true} func={func} />
    );

    fireEvent.click(getByTestId(/button/i));
    expect(func).toHaveBeenCalledTimes(1);
  });
});
