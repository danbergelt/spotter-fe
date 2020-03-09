import React from 'react';
import NavLinks from 'src/components/layout/NavLinks';
import { reducer } from 'src/reducers';
import wrapper from 'src/__testUtils__/wrapper';
import { fireEvent } from '@testing-library/dom';
import { ADD_TOKEN } from 'src/actions/addTokenActions';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('nav links', () => {
  test('unauth routes point to proper locations', () => {
    const { history, getByTestId } = wrapper(reducer, <NavLinks />);

    fireEvent.click(getByTestId(/login/i));
    expect(history.location.pathname).toEqual('/login');

    fireEvent.click(getByTestId(/signup/i));
    expect(history.location.pathname).toEqual('/signup');
  });

  test('auth routes point to proper locations', async () => {
    mockAxios.get.mockResolvedValue({});
    const { history, store, getByTestId } = wrapper(reducer, <NavLinks />);

    store.dispatch({ type: ADD_TOKEN, payload: 'token' });

    fireEvent.click(getByTestId(/settings/i));
    expect(history.location.pathname).toEqual('/settings');

    await act(async () => {
      await fireEvent.click(getByTestId(/logout/i));
    });

    expect(history.location.pathname).toEqual('/login');
  });
});
