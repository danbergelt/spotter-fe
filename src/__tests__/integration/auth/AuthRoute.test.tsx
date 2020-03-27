import React from 'react';
import AuthRoute from '../../../components/auth/AuthRoute';
import Dashboard from '../../../pages/Dashboard';
import wrapper from '../../../__testUtils__/wrapper';
import { reducer } from '../../../reducers/index';
import { ADD_TOKEN } from '../../../actions/addTokenActions';
import axios from 'axios';
import { wait } from '@testing-library/react';
import ForgotPassword from 'src/pages/ForgotPassword';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => jest.clearAllMocks());

describe('auth route', () => {
  test('unauthenticated user redirects to login', () => {
    const { queryAllByText, history } = wrapper(
      reducer,
      <AuthRoute path='/dashboard' component={Dashboard} auth={true} />
    );

    history.push('/dashboard');
    expect(queryAllByText(/add workout/i)).toEqual([]);
    expect(history.location.pathname).toEqual('/login');
  });

  test('authenticated user passes through to component', async () => {
    mockAxios.post.mockResolvedValue({});
    const { queryAllByText, store, history } = wrapper(
      reducer,
      <AuthRoute path='/dashboard' component={Dashboard} auth={true} />
    );

    store.dispatch({ type: ADD_TOKEN, payload: 'token' });
    history.push('/dashboard');
    await wait(() => expect(queryAllByText(/add workout/i)).toHaveLength(7));
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
    const { history } = wrapper(
      reducer,
      <AuthRoute
        path='/forgotpassword'
        component={ForgotPassword}
        auth={false}
      />
    );

    history.push('/forgotpassword');
    expect(history.location.pathname).toEqual('/forgotpassword');
  });
});
