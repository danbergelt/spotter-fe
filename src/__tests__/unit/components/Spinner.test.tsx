import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Spinner from 'src/components/util/Spinner';

describe('custom spinner', () => {
  test('can render spinner with props', () => {
    const { getByTestId } = render(<Spinner size={25} color='orange' />);

    const spinner = getByTestId(/spinner/i);
    expect(spinner).toHaveAttribute('height', '25');
    expect(spinner).toHaveAttribute('width', '25');
    expect(spinner).toHaveAttribute('color', 'orange');
  });

  test('renders white for default color', () => {
    const { getByTestId } = render(<Spinner size={25} />);

    const spinner = getByTestId(/spinner/i);
    expect(spinner).toHaveAttribute('color', 'white');
  });
});
