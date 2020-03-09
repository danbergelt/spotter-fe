import React from 'react';
import Nav from 'src/components/layout/Nav';
import wrapper from 'src/__testUtils__/wrapper';
import { reducer } from 'src/reducers';
import mqPolyfill from 'mq-polyfill';
import { fireEvent } from '@testing-library/dom';

describe('nav', () => {
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

  test('renders links at width > 500', () => {
    window.resizeTo(501, 1000);

    const { getByText } = wrapper(reducer, <Nav />);

    getByText(/log in/i);
    getByText(/sign up/i);
  });

  test('renders burger at width <= 500', async () => {
    window.resizeTo(500, 1000);

    const { getByTestId } = wrapper(reducer, <Nav />);

    getByTestId(/burger/i);
  });

  test('logo points to home', () => {
    const { getByText, history } = wrapper(reducer, <Nav />);

    history.push('/foo');

    expect(history.location.pathname).toEqual('/foo');

    fireEvent.click(getByText(/spotter/i));

    expect(history.location.pathname).toEqual('/');
  });
});
