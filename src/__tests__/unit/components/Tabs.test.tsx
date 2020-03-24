import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Tabs from 'src/components/lib/Tabs';
import useTabs from 'src/hooks/useTabs';

interface Props {
  tabs?: Array<string>;
}

const TabsWrapper: React.FC<Props> = ({ tabs }) => {
  const state = useTabs('foo');
  return (
    <>
      <Tabs state={state} tabs={tabs ? tabs : ['foo', 'bar']} />
      {state[0] === 'foo' && <div>foo toggle</div>}
      {state[0] === 'bar' && <div>bar toggle</div>}
    </>
  );
};

describe('tabs utility component', () => {
  test('renders initial state', () => {
    const { getByText } = render(<TabsWrapper />);
    getByText(/foo toggle/i);
  });

  test('throws error if duplicate in tabs', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<TabsWrapper tabs={['foo', 'foo']} />)).toThrowError(
      'Duplicate tab detected. All tabs must be unique strings.'
    );

    jest.restoreAllMocks();
  });

  test('can toggle betwen tabs', () => {
    const { getByText } = render(<TabsWrapper />);
    getByText(/foo toggle/i);
    fireEvent.click(getByText(/bar/i));
    getByText(/bar toggle/i);
    fireEvent.click(getByText(/foo/i));
    getByText(/foo toggle/i);
  });
});
