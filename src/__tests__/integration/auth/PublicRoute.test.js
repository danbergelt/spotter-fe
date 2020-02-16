import React from 'react';
import axios from 'axios';
import wrapper from '../../../__testUtils__/wrapper';
import { cleanup } from '@testing-library/react';
import { reducer } from '../../../reducers/index';
import ForgotPasswordInstructions from 'src/components/auth/ForgotPassInstructions';
import { ADD_TOKEN } from 'src/actions/addTokenActions';
import PublicRoute from 'src/components/auth/PublicRoute';

describe('Forgot password instructions', () => {
  afterEach(cleanup);

  test('unauthenticated user passes through to protected component', async () => {
    const { queryByText } = wrapper(
      reducer,
      <PublicRoute component={ForgotPasswordInstructions} />
    );
    expect(queryByText(/forgot your password/i)).toBeTruthy();
  });

  test('authenticated redirects to dashboard', () => {
    axios.post.mockResolvedValue({});
    const { store, queryByText } = wrapper(
      reducer,
      <PublicRoute component={ForgotPasswordInstructions} />
    );

    store.dispatch({ type: ADD_TOKEN, payload: 'token' });

    expect(queryByText(/forgot your password/i)).toBeFalsy();
  });
});
