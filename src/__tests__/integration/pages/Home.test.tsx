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

  test('image text link works', () => {
    const { getByTestId, history } = wrapper(reducer, <Home />);

    history.push('/');

    fireEvent.click(getByTestId(/imgtxt/i));

    expect(history.location.pathname).toEqual('/signup');
  });

  test('hero links works', () => {
    const { getByTestId, history } = wrapper(reducer, <Home />);

    history.push('/');

    fireEvent.click(getByTestId(/hero/i));

    expect(history.location.pathname).toEqual('/signup');

    fireEvent.click(getByTestId(/alt/i));

    expect(history.location.pathname).toEqual('/login');
  });
});
