import React from 'react';
import SignUp from '../../../pages/SignUp';
import axios from 'axios';
import { cleanup, fireEvent, wait } from '@testing-library/react';
import wrapper from '../../../__testUtils__/wrapper';

describe('Register validation', () => {
  afterEach(cleanup);

  test('register page renders with empty inputs', () => {
    const { getByPlaceholderText } = wrapper(() => {}, <SignUp />);

    const email = getByPlaceholderText(/name@email.com/i);
    const password = getByPlaceholderText(/password/i);

    expect(email.getAttribute('value')).toBe('');
    expect(password.getAttribute('value')).toBe('');
  });

  test('fields can be typed in', () => {
    const { getByPlaceholderText } = wrapper(() => {}, <SignUp />);

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

  test('register page renders yup vals on touched fields', async () => {
    const { container, getByPlaceholderText, findByText } = wrapper(() => {},
    <SignUp />);

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

  test('register attempt with invalid credentials', async () => {
    // mock err response
    axios.post.mockRejectedValue({
      response: { data: { error: 'Test reject' } }
    });

    const {
      container,
      getByPlaceholderText,
      findByText,
      getByTestId
    } = wrapper(() => {}, <SignUp />);

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

  test('successful registration', async () => {
    axios.post.mockResolvedValue({
      data: { token: 'test-token' }
    });

    const { getByPlaceholderText, getByTestId, history } = wrapper(() => {},
    <SignUp />);

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
