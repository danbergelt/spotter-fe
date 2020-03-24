import React from 'react';
import Login from '../../../pages/LogIn';
import axios from 'axios';
import wrapper from '../../../__testUtils__/wrapper';
import { cleanup, fireEvent, wait } from '@testing-library/react';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('Login validation', () => {
  afterEach(cleanup);

  test('login page renders empty inputs', () => {
    const { getByPlaceholderText } = wrapper(() => {}, <Login />);
    const email = getByPlaceholderText(/name@email.com/i);
    const password = getByPlaceholderText(/password/i);
    expect(email.getAttribute('value')).toBe('');
    expect(password.getAttribute('value')).toBe('');
  });

  test('fields can be typed in', () => {
    const { getByPlaceholderText } = wrapper(() => {}, <Login />);
    const email = getByPlaceholderText(/name@email.com/i);
    const password = getByPlaceholderText(/password/i);

    fireEvent.change(email, {
      target: { value: 'test@input.com' }
    });
    fireEvent.change(password, {
      target: { value: 'testinginputs' }
    });
    expect(email.getAttribute('value')).toBe('test@input.com');
    expect(password.getAttribute('value')).toBe('testinginputs');
  });

  test('form validation', async () => {
    const { getByPlaceholderText, getByText, getByTestId } = wrapper(() => {},
    <Login />);
    const email = getByPlaceholderText(/name@email.com/i);
    const password = getByPlaceholderText(/password/i);
    fireEvent.click(getByTestId(/button/i));
    await wait(() => expect(getByText(/email is required/i)).toBeTruthy());
    await wait(() => expect(getByText(/password is required/i)).toBeTruthy());
    fireEvent.change(email, { target: { value: 'foobar' } });
    await wait(() => expect(getByText(/invalid email/i)).toBeTruthy());
    fireEvent.change(password, { target: { value: 'foo' } });
    await wait(() => expect(getByText(/six char minimum/i)).toBeTruthy());
  });

  test('login attempt with invalid credentials', async () => {
    // mock err response
    mockAxios.post.mockRejectedValue({
      response: { data: { error: 'Test reject' } }
    });
    const {
      container,
      getByPlaceholderText,
      findByText,
      getByTestId
    } = wrapper(() => {}, <Login />);
    fireEvent.change(getByPlaceholderText(/name@email.com/i), {
      target: { value: 'bademail@email.com' }
    });
    fireEvent.change(getByPlaceholderText(/password/i), {
      target: { value: 'badpassword' }
    });
    fireEvent.click(getByTestId(/button/i));
    const apiVal = await findByText(/test reject/i);
    expect(container.contains(apiVal)).toBeTruthy();
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    mockAxios.post.mockClear();
  });

  test('successful login', async () => {
    mockAxios.post.mockResolvedValue({
      data: { token: 'test-token' }
    });
    const { getByPlaceholderText, getByTestId, history } = wrapper(() => {},
    <Login />);
    fireEvent.change(getByPlaceholderText(/name@email.com/i), {
      target: { value: 'goodemail@email.com' }
    });
    fireEvent.change(getByPlaceholderText(/password/i), {
      target: { value: 'goodpassword' }
    });
    fireEvent.click(getByTestId(/button/i));
    await wait(() => {
      expect(mockAxios.post).toHaveBeenCalledTimes(1);
      expect(history.location.pathname).toEqual('/dashboard');
    });
  });
});
