import React from 'react';
import wrapper from 'src/__testUtils__/wrapper';
import { reducer } from 'src/reducers';
import Home from 'src/pages/Home';
import { fireEvent } from '@testing-library/dom';

describe('home page tests', () => {
  test('bottom cta link works', () => {
    const { getByTestId, history } = wrapper(reducer, <Home />);

    history.push('/');

    fireEvent.click(getByTestId(/bottom-cta/i));

    expect(history.location.pathname).toEqual('/signup');
  });
});
