import React from 'react';
import CloseAccount from 'src/components/settings/CloseAccount';
import wrapper from 'src/__testUtils__/wrapper';
import { reducer } from 'src/reducers';
import { fireEvent, wait } from '@testing-library/dom';
import axios from 'axios';
import { ADD_TOKEN } from 'src/actions/addTokenActions';
import AuthRoute from 'src/components/auth/AuthRoute';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('close account', () => {
  test('can toggle close account states', () => {
    const { getByTestId } = wrapper(reducer, <CloseAccount />);

    const unchecked = getByTestId(/^unchecked$/i);

    fireEvent.click(unchecked);

    const checked = getByTestId(/^checked$/i);

    fireEvent.click(checked);

    getByTestId(/^unchecked$/i);
  });

  test('reject close account request', async () => {
    mockAxios.delete.mockRejectedValue({
      response: { data: { error: 'test error' } }
    });

    const { store, getByTestId, getByText } = wrapper(
      reducer,
      <CloseAccount />
    );

    store.dispatch({ type: ADD_TOKEN, payload: 'token' });

    fireEvent.click(getByTestId(/^unchecked$/i));

    fireEvent.click(getByTestId(/button/i));

    await wait(() => expect(getByText(/test error/i)).toBeTruthy());
  });

  test('accept close account request', async () => {
    mockAxios.delete.mockResolvedValue({ data: { success: true } });

    const { store, getByTestId, queryByTestId, history } = wrapper(
      reducer,
      <AuthRoute auth={true} component={CloseAccount} />
    );

    store.dispatch({ type: ADD_TOKEN, payload: 'token' });

    fireEvent.click(getByTestId(/^unchecked$/i));

    fireEvent.click(getByTestId(/button/i));

    await wait(() => expect(queryByTestId(/button/i)).toBeFalsy());
    expect(history.location.pathname).toEqual('/login');
    mockAxios.delete.mockClear();
  });

  test('blocked from submitting request when not confirmed by user', () => {
    mockAxios.delete.mockResolvedValue({ data: { success: true } });
    const { store, getByTestId, history } = wrapper(
      reducer,
      <AuthRoute auth={true} component={CloseAccount} />
    );

    store.dispatch({ type: ADD_TOKEN, payload: 'token' });

    history.push('/settings');

    fireEvent.click(getByTestId(/button/i));

    expect(mockAxios.delete).toHaveBeenCalledTimes(0);
  });
});
