import React from 'react';
import wrapper from 'src/__testUtils__/wrapper';
import SubNav from 'src/components/dash/subnav/SubNav';
import { reducer } from 'src/reducers';
import { fireEvent } from '@testing-library/dom';

describe('Subnav component', () => {
  test('can toggle between week and month in dropdown', () => {
    const { getByText, getByTestId } = wrapper(reducer, <SubNav />);

    const sel = getByText(/week/i);

    fireEvent.click(sel);

    fireEvent.click(getByTestId(/opt2/i));

    getByText(/month/i);
  });
});
