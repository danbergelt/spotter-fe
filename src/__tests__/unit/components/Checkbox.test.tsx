import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import Checkbox from 'src/components/lib/Checkbox';

describe('checkbox utility component', () => {
  test('can turn checkbox on and off', () => {
    const Component = () => {
      const [state, setState] = useState(false);
      return <Checkbox state={state} setState={setState} />;
    };

    const { getByTestId } = render(<Component />);

    const unchecked = getByTestId(/^unchecked$/i);

    fireEvent.click(unchecked);

    const checked = getByTestId(/^checked$/i);

    fireEvent.click(checked);

    getByTestId(/^unchecked$/i);
  });
});
