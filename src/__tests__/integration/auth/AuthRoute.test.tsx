import React from 'react';
import AuthRoute from '../../../components/auth/AuthRoute';
import Dashboard from '../../../pages/Dashboard';
import wrapper from '../../../__testUtils__/wrapper';
import { reducer } from '../../../reducers/index';
import { ADD_TOKEN } from '../../../actions/addTokenActions';
import axios from 'axios';
import { wait } from '@testing-library/react';
import { AxiosMock } from '../../../__testUtils__/types';
import ForgotPassword from 'src/pages/ForgotPassword';
import NotFound from 'src/pages/NotFound';

const mockAxios = axios as AxiosMock;

beforeEach(() => jest.clearAllMocks());

describe('auth route', () => {
  test('unauthenticated user redirects to login', () => {
    const { queryByTestId, history } = wrapper(
      reducer,
      <AuthRoute path='/dashboard' component={Dashboard} auth={true} />
    );

    history.push('/dashboard');
    expect(queryByTestId(/modal-click/i)).toBeFalsy();
    expect(history.location.pathname).toEqual('/login');
  });

  test('authenticated user passes through to component', async () => {
    mockAxios.mockResolvedValue({});
    const { queryByTestId, store, history } = wrapper(
      reducer,
      <AuthRoute path='/dashboard' component={Dashboard} auth={true} />
    );

    store.dispatch({ type: ADD_TOKEN, payload: 'token' });
    history.push('/dashboard');
    await wait(() => expect(queryByTestId(/modal-click/i)).toBeTruthy());
    expect(history.location.pathname).toEqual('/dashboard');
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  test('authenticated user redirects to dashboard', async () => {
    const { store, history } = wrapper(
      reducer,
      <AuthRoute
        path='/forgotpassword'
        component={ForgotPassword}
        auth={false}
      />
    );

    store.dispatch({ type: ADD_TOKEN, payload: 'token' });
    history.push('/forgotpassword');
    await wait(() => expect(history.location.pathname).toEqual('/dashboard'));
  });

  test('unauthenticated user passes through to component', async () => {
    const { queryByTestId, history } = wrapper(
      reducer,
      <AuthRoute
        path='/forgotpassword'
        component={ForgotPassword}
        auth={false}
      />
    );

    history.push('/forgotpassword');
    expect(queryByTestId(/modal-click/i)).toBeFalsy();
    expect(history.location.pathname).toEqual('/forgotpassword');
  });

  test("globally accessible route for auth'd user", async () => {
    const { store, queryByText, history } = wrapper(
      reducer,
      <AuthRoute path='/foo' component={NotFound} auth={null} />
    );

    store.dispatch({ type: ADD_TOKEN, payload: 'token' });
    history.push('/foo');
    await wait(() => expect(history.location.pathname).toEqual('/foo'));
    expect(queryByText(/404/i)).toBeTruthy();
  });

  test("globally accessible route for unauth'd user", async () => {
    const { queryByText, history } = wrapper(
      reducer,
      <AuthRoute path='/foo' component={NotFound} auth={null} />
    );

    history.push('/foo');
    await wait(() => expect(history.location.pathname).toEqual('/foo'));
    expect(queryByText(/404/i)).toBeTruthy();
  });
});
