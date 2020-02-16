import React from 'react';
import ForgotAndChangePass from '../../../components/auth/ForgotAndChangePass';
import { reducer } from '../../../reducers/index';
import axios from 'axios';
import wrapper from '../../../__testUtils__/wrapper';
import { cleanup, fireEvent, wait } from '@testing-library/react';

describe('Change forgotten password', () => {
  afterEach(cleanup);

  test('forgot password page renders empty input', () => {
    const { getByPlaceholderText } = wrapper(reducer, <ForgotAndChangePass />);

    const email1 = getByPlaceholderText(/Pick a secure password.../i);
    const email2 = getByPlaceholderText(/Confirm secure password.../i);

    expect(email1.getAttribute('value')).toBe('');
    expect(email2.getAttribute('value')).toBe('');
  });

  test('fields can be typed in', () => {
    const { getByPlaceholderText } = wrapper(reducer, <ForgotAndChangePass />);

    const email1 = getByPlaceholderText(/Pick a secure password.../i);
    const email2 = getByPlaceholderText(/Confirm secure password.../i);

    fireEvent.change(email1, {
      target: { value: 'test@input.com' }
    });

    fireEvent.change(email2, {
      target: { value: 'test@input.com' }
    });

    expect(email1.getAttribute('value')).toBe('test@input.com');
    expect(email2.getAttribute('value')).toBe('test@input.com');
  });

  test('attempt with invalid credentials', async () => {
    // mock err response
    axios.put.mockRejectedValue({
      response: { data: { error: 'Test reject' } }
    });

    const { getAllByText, findByText, container } = wrapper(
      reducer,
      <ForgotAndChangePass />
    );

    fireEvent.click(getAllByText(/change password/i)[1]);

    const apiVal = await findByText(/test reject/i);

    expect(container.contains(apiVal)).toBeTruthy();
    expect(axios.put).toHaveBeenCalledTimes(1);
    axios.put.mockClear();
  });

  test('successful submission', async () => {
    axios.put.mockResolvedValue({
      data: { token: 'foo' }
    });

    const { getAllByText, history } = wrapper(reducer, <ForgotAndChangePass />);

    fireEvent.click(getAllByText(/change password/i)[1]);

    await wait(() => expect(history.location.pathname).toEqual('/dashboard'));
    expect(axios.put).toHaveBeenCalledTimes(1);
    axios.put.mockClear();
  });
});
