import React from 'react';
import wrapper from 'src/__testUtils__/wrapper';
import { reducer } from 'src/reducers';
import LogIn from 'src/pages/LogIn';

describe('log in page', () => {
  test('renders', () => {
    const { getAllByText, getByTestId } = wrapper(reducer, <LogIn />);

    getAllByText(/log in/i);

    getByTestId(/login-img/i);
  });
});
