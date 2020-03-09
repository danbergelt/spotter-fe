import React, { useState, useRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import Dropdown from 'src/components/lib/Dropdown';

const Foo = () => {
  const [state, setState] = useState(false);
  const ref = useRef(null);

  return (
    <>
      <div>bar</div>
      <button ref={ref} onClick={() => setState(!state)}>
        foo
      </button>
      {state && (
        <Dropdown triggerRef={ref} setState={setState}>
          <div>baz</div>
        </Dropdown>
      )}
    </>
  );
};

describe('dropdown', () => {
  test('renders children', () => {
    const { queryByText, getByText } = render(<Foo />);

    expect(queryByText(/baz/i)).toBeFalsy();

    fireEvent.click(getByText(/foo/i));

    expect(queryByText(/baz/i)).toBeTruthy();
  });

  test('closes dropdown on trigger ref click', () => {
    const { getByText, queryByText } = render(<Foo />);

    fireEvent.click(getByText(/foo/i));

    expect(queryByText(/baz/i)).toBeTruthy();

    fireEvent.click(getByText(/foo/i));

    expect(queryByText(/baz/i)).toBeFalsy();
  });

  test('closes dropdown on outside click', () => {
    const { getByText, queryByText } = render(<Foo />);

    fireEvent.click(getByText(/foo/i));

    expect(queryByText(/baz/i)).toBeTruthy();

    fireEvent.click(getByText(/bar/i));

    expect(queryByText(/baz/i)).toBeFalsy();
  });
});
