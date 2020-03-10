import React from 'react';
import wrapper from 'src/__testUtils__/wrapper';
import { reducer } from 'src/reducers';
import Home from 'src/pages/Home';
import mqPolyfill from 'mq-polyfill';
import { fireEvent } from '@testing-library/dom';

describe('home page tests', () => {
  beforeAll(() => {
    mqPolyfill(window);
    window.resizeTo = function resizeTo(width, height) {
      Object.assign(this, {
        innerWidth: width,
        innerHeight: height,
        outerWidth: width,
        outerHeight: height
      }).dispatchEvent(new this.Event('resize'));
    };
  });

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

  test('features renders tabs when width > 1000', () => {
    window.resizeTo(1001, 1000);
    const { getByTestId } = wrapper(reducer, <Home />);

    getByTestId(/tab/i);
  });

  test('features renders select when width <= 1000', () => {
    window.resizeTo(1000, 1000);
    const { getByTestId } = wrapper(reducer, <Home />);

    getByTestId(/select/i);
  });

  test('hover selection works', () => {
    window.resizeTo(1001, 1000);
    const { getByText, getByAltText } = wrapper(reducer, <Home />);

    getByAltText(/week view/i);

    fireEvent.mouseOver(getByText(/month view/i));

    getByAltText(/month view/i);

    fireEvent.mouseOver(getByText(/PR Tracking/i));

    getByAltText(/pr tracking/i);
  });

  test('select works', () => {
    window.resizeTo(999, 1000);

    const { getByTestId, getByAltText } = wrapper(reducer, <Home />);

    getByAltText(/week view/i);

    fireEvent.change(getByTestId(/select/i), {
      target: { value: 'Month View' }
    });

    getByAltText(/month view/i);

    fireEvent.change(getByTestId(/select/i), {
      target: { value: 'PR Tracking' }
    });

    getByAltText(/pr tracking/i);
  });
});
