import React from 'react';
import wrapper from '../../../__testUtils__/wrapper';
import Routes from '../../../routes';
import { cleanup, wait } from '@testing-library/react';
import mockAxios from 'axios';
import mockWorkoutRes from '../../../__testUtils__/mockWorkoutRes';
import { reducer } from '../../../reducers/index';
import { ADD_TOKEN } from '../../../actions/addTokenActions';

describe('redirects and conditional rendering', () => {
  afterEach(cleanup);

  test('home path automatically renders `/` ', () => {
    const { history } = wrapper(reducer, <Routes />);

    expect(history.location.pathname).toBe('/');
  });

  test('nav conditionally renders when logged out', () => {
    const { container, getByText, queryByText } = wrapper(reducer, <Routes />);

    expect(container.contains(getByText(/lifting pal/i))).toBeTruthy();
    expect(container.contains(queryByText(/log out/i))).toBeFalsy();
    expect(container.contains(queryByText(/settings/i))).toBeFalsy();
  });

  test('nav conditionally renders when logged in', async () => {
    mockAxios.post.mockResolvedValue(mockWorkoutRes);

    const { container, getByText, queryByText, store } = wrapper(
      reducer,
      <Routes />
    );

    store.dispatch({ type: ADD_TOKEN, payload: 'token' });

    expect(container.contains(getByText(/log out/i))).toBeTruthy();
    expect(container.contains(queryByText(/log in/i))).toBeFalsy();
    expect(container.contains(queryByText(/about/i))).toBeFalsy();
    await wait(() => expect(mockAxios.post).toHaveBeenCalledTimes(1));
  });

  test('dashboard path pushes logged out users to login', () => {
    const { history } = wrapper(reducer, <Routes />);

    history.push('/dashboard');
    expect(history.location.pathname).toEqual('/login');
  });

  test('home path pushes logged in users to dashboard', () => {
    const { container, getByText, history, store } = wrapper(
      reducer,
      <Routes />
    );

    store.dispatch({ type: ADD_TOKEN, payload: 'token' });

    expect(history.location.pathname).toEqual('/dashboard');
    expect(container.contains(getByText(/week/i))).toBeTruthy();
  });

  test('login path pushes logged in users to dashboard', () => {
    const { container, getByText, history, store } = wrapper(
      reducer,
      <Routes />
    );

    store.dispatch({ type: ADD_TOKEN, payload: 'token' });

    history.push('/login');
    expect(history.location.pathname).toEqual('/dashboard');
    expect(container.contains(getByText(/week/i))).toBeTruthy();
  });

  test('signup path pushes logged in users to dashboard', () => {
    const { container, getByText, history, store } = wrapper(
      reducer,
      <Routes />
    );

    store.dispatch({ type: ADD_TOKEN, payload: 'token' });

    history.push('/signup');
    expect(history.location.pathname).toEqual('/dashboard');
    expect(container.contains(getByText(/week/i))).toBeTruthy();
  });

  test('404 page displays at bad route', () => {
    const { container, history } = wrapper(reducer, <Routes />);
    history.push('/badroutetest/badroute');

    expect(container.innerHTML).toMatch(/404/i);
  });

  // test("500 page displays at server error", async () => {
  //   mockAxios.post.mockRejectedValue({ unhandled: "error" });
  //   const { container, history, store } = wrapper(reducer, <Routes />);

  //   history.push("/dashboard");
  //   await wait(() => expect(container.innerHTML).toMatch(/500/i));
  // });
});
