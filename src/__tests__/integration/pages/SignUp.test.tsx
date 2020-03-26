import React from 'react';
import wrapper from 'src/__testUtils__/wrapper';
import { reducer } from 'src/reducers';
import SignUp from 'src/pages/SignUp';

describe('log in page', () => {
  test('renders', () => {
    const { getAllByText, getByTestId } = wrapper(reducer, <SignUp />);

    getAllByText(/Sign Up/i);

    getByTestId(/signup-img/i);
  });
});
