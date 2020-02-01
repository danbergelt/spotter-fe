import React from 'react';
import Login from '../../../pages/LogIn';
import axios from 'axios';
import wrapper from '../../../__testUtils__/wrapper';
import { cleanup, fireEvent, wait } from '@testing-library/react';

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

  test('login page renders yup vals on touched fields', async () => {
    const { container, getByPlaceholderText, findByText } = wrapper(() => {},
    <Login />);

    const email = getByPlaceholderText(/name@email.com/i);
    const password = getByPlaceholderText(/password/i);

    fireEvent.focus(email);
    fireEvent.blur(email);

    const eVal = await findByText(/email is required/i);
    expect(container.contains(eVal)).toBeTruthy();

    fireEvent.focus(password);
    fireEvent.blur(password);

    const pVal = await findByText(/password is required/i);
    expect(container.contains(pVal)).toBeTruthy();
  });

  test('login attempt with invalid credentials', async () => {
    // mock err response
    axios.post.mockRejectedValue({
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

    fireEvent.click(getByTestId(/form-submit/i));

    const apiVal = await findByText(/test reject/i);

    expect(container.contains(apiVal)).toBeTruthy();
    expect(axios.post).toHaveBeenCalledTimes(1);
    axios.post.mockClear();
  });

  test('successful login', async () => {
    axios.post.mockResolvedValue({
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

    fireEvent.click(getByTestId(/form-submit/i));

    await wait(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(history.location.pathname).toEqual('/dashboard');
    });
  });
});
