import React from 'react';
import ChangePassword from '../../../pages/ChangePassword';
import { reducer } from '../../../reducers/index';
import axios from 'axios';
import wrapper from '../../../__testUtils__/wrapper';
import { cleanup, fireEvent, wait } from '@testing-library/react';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('Change forgotten password', () => {
  afterEach(cleanup);

  test('forgot password page renders empty input', () => {
    const { getByPlaceholderText } = wrapper(reducer, <ChangePassword />);
    const password = getByPlaceholderText(/new password/i);
    const confirmPassword = getByPlaceholderText(/confirm password/i);
    expect(password.getAttribute('value')).toBe('');
    expect(confirmPassword.getAttribute('value')).toBe('');
  });

  test('fields can be typed in', () => {
    const { getByPlaceholderText } = wrapper(reducer, <ChangePassword />);
    const password = getByPlaceholderText(/new password/i);
    const confirmPassword = getByPlaceholderText(/confirm password/i);
    fireEvent.change(password, {
      target: { value: 'test' }
    });
    fireEvent.change(confirmPassword, {
      target: { value: 'test' }
    });
    expect(password.getAttribute('value')).toBe('test');
    expect(confirmPassword.getAttribute('value')).toBe('test');
  });

  test('rejected request', async () => {
    mockAxios.put.mockRejectedValue({
      response: { data: { error: 'Test reject' } }
    });
    const { getByPlaceholderText, getByText } = wrapper(
      reducer,
      <ChangePassword />
    );
    const password = getByPlaceholderText(/new password/i);
    const confirmPassword = getByPlaceholderText(/confirm password/i);
    fireEvent.change(password, {
      target: { value: 'password' }
    });
    fireEvent.change(confirmPassword, {
      target: { value: 'password' }
    });
    fireEvent.click(getByText(/submit/i));
    await wait(() => expect(getByText(/test reject/i)).toBeTruthy());
    expect(axios.put).toHaveBeenCalledTimes(1);
    mockAxios.put.mockClear();
  });

  test('successful request', async () => {
    mockAxios.put.mockResolvedValue({
      data: { token: 'foo' }
    });
    const { getByText, history, getByPlaceholderText } = wrapper(
      reducer,
      <ChangePassword />
    );
    const password = getByPlaceholderText(/new password/i);
    const confirmPassword = getByPlaceholderText(/confirm password/i);
    fireEvent.change(password, {
      target: { value: 'password' }
    });
    fireEvent.change(confirmPassword, {
      target: { value: 'password' }
    });
    fireEvent.click(getByText(/submit/i));
    await wait(() => expect(history.location.pathname).toEqual('/dashboard'));
    expect(axios.put).toHaveBeenCalledTimes(1);
    mockAxios.put.mockClear();
  });

  test('form validation', async () => {
    const { getByText, getByPlaceholderText } = wrapper(
      reducer,
      <ChangePassword />
    );
    const password = getByPlaceholderText(/new password/i);
    const confirmPassword = getByPlaceholderText(/confirm password/i);
    fireEvent.change(password, {
      target: { value: 'foo' }
    });
    fireEvent.change(confirmPassword, {
      target: { value: 'foo' }
    });
    fireEvent.click(getByText(/submit/i));
    await wait(() => expect(getByText(/six char minimum/i)).toBeTruthy());
    fireEvent.change(password, {
      target: { value: 'password' }
    });
    await wait(() => expect(getByText(/fields must match/i)).toBeTruthy());
    fireEvent.change(password, {
      target: { value: '' }
    });
    await wait(() => expect(getByText(/pick new password/i)).toBeTruthy());
  });
});
