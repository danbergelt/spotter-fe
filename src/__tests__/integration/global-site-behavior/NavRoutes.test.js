import React from 'react';
import Routes from '../../../routes';
import { fireEvent, cleanup, wait } from '@testing-library/react';
import wrapper from '../../../__testUtils__/wrapper';
import axios from 'axios';
import mockWorkoutRes from '../../../__testUtils__/mockWorkoutRes';
import { reducer } from '../../../reducers/index';
import { ADD_TOKEN } from '../../../actions/addTokenActions';

describe('Nav routes', () => {
  afterEach(() => {
    cleanup;
    jest.clearAllMocks();
  });

  test('Nav routes point to proper locations', () => {
    const { container, getByTestId } = wrapper(reducer, <Routes />);

    // home route
    expect(container.innerHTML).toMatch(/pal/i);

    // login page
    fireEvent.click(getByTestId(/login/i));
    expect(getByTestId(/login-img/i)).toBeTruthy();

    // signup page
    fireEvent.click(getByTestId(/signup/i));
    expect(getByTestId(/signup-img/i)).toBeTruthy();

    // back to home
    fireEvent.click(getByTestId(/spotter/i));
    expect(container.innerHTML).toMatch(/pal/i);
  });

  test('logout functionality works', async () => {
    axios.post.mockResolvedValue(mockWorkoutRes);
    const { getByTestId, history, store } = wrapper(reducer, <Routes />);

    store.dispatch({ type: ADD_TOKEN, payload: 'token' });

    fireEvent.click(getByTestId(/logout/i));
    await wait(() => expect(history.location.pathname).toEqual('/login'));
    // axios called twice: once to send logout request, another to send failed fetch workouts request when state is wiped
    expect(axios.post).toHaveBeenCalledTimes(2);
  });

  test('can navigate to settings page', () => {
    axios.post.mockResolvedValue(mockWorkoutRes);
    const { getByTestId, history, store } = wrapper(reducer, <Routes />);

    store.dispatch({ type: ADD_TOKEN, payload: 'token' });

    fireEvent.click(getByTestId(/settings/i));
    expect(history.location.pathname).toEqual('/settings');
  });
});
