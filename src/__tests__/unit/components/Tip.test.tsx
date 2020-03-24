import React from 'react';
import { render } from '@testing-library/react';
import Tip from 'src/components/lib/Tip';
import '@testing-library/jest-dom/extend-expect';

describe('tip component', () => {
  test('renders trigger string', () => {
    const { getByText } = render(
      <Tip content='foo' trigger='bar' place='top' />
    );

    getByText(/bar/i);
    getByText(/foo/i);
  });

  test('renders trigger component', () => {
    const Foo = () => <div>component</div>;

    const { getByText } = render(
      <Tip content='foo' trigger={Foo} place='top' />
    );

    getByText(/component/i);
    getByText(/foo/i);
  });

  test('dynamically applies class names', () => {
    const { getByText, rerender } = render(
      <Tip content='foo' trigger='bar' place='top' />
    );
    expect(getByText(/foo/i)).toHaveClass('top');

    rerender(<Tip content='foo' trigger='bar' place='right' />);
    expect(getByText(/foo/i)).toHaveClass('right');

    rerender(<Tip content='foo' trigger='bar' place='bottom' />);
    expect(getByText(/foo/i)).toHaveClass('bottom');

    rerender(<Tip content='foo' trigger='bar' place='left' />);
    expect(getByText(/foo/i)).toHaveClass('left');
  });
});
