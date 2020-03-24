import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import Toggler from 'src/components/lib/Toggler';

describe('toggler component', () => {
  test('can toggle on and off', () => {
    const A = () => {
      return <div>on</div>;
    };

    const B = () => {
      return <div>off</div>;
    };

    const Wrapper = () => {
      const [state, setState] = useState(false);
      return (
        <>
          <button onClick={() => setState(!state)}>toggle</button>
          <Toggler state={state} on={A} off={B} />
        </>
      );
    };

    const { getByText } = render(<Wrapper />);

    getByText(/off/i);

    fireEvent.click(getByText(/toggle/i));

    getByText(/on/i);

    fireEvent.click(getByText(/toggle/i));

    getByText(/off/i);
  });
});
