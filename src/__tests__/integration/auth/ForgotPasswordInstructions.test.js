import React from 'react';
import ForgotPasswordInstructions from 'src/components/auth/ForgotPassInstructions';
import { reducer } from '../../../reducers/index';
import axios from 'axios';
import wrapper from '../../../__testUtils__/wrapper';
import { cleanup, fireEvent } from '@testing-library/react';

describe('Forgot password instructions', () => {
  afterEach(cleanup);

  test('forgot password page renders empty input', () => {
    const { getByPlaceholderText } = wrapper(
      reducer,
      <ForgotPasswordInstructions />
    );

    const email = getByPlaceholderText(/name@email.com/i);

    expect(email.getAttribute('value')).toBe('');
  });

  test('fields can be typed in', () => {
    const { getByPlaceholderText } = wrapper(
      reducer,
      <ForgotPasswordInstructions />
    );

    const email = getByPlaceholderText(/name@email.com/i);

    fireEvent.change(email, {
      target: { value: 'test@input.com' }
    });

    expect(email.getAttribute('value')).toBe('test@input.com');
  });

  test('attempt with invalid credentials', async () => {
    // mock err response
    axios.post.mockRejectedValue({
      response: { data: { error: 'Test reject' } }
    });

    const { getByPlaceholderText, getByText, findByText, container } = wrapper(
      reducer,
      <ForgotPasswordInstructions />
    );

    fireEvent.change(getByPlaceholderText(/name@email.com/i), {
      target: { value: 'bademail@email.com' }
    });

    fireEvent.click(getByText(/send instructions/i));

    const apiVal = await findByText(/test reject/i);

    expect(container.contains(apiVal)).toBeTruthy();
    expect(axios.post).toHaveBeenCalledTimes(1);
    axios.post.mockClear();
  });

  test('successful submission', async () => {
    axios.post.mockResolvedValue({
      data: { token: 'test success' }
    });

    const { getByPlaceholderText, getByText, findByText, container } = wrapper(
      reducer,
      <ForgotPasswordInstructions />
    );

    fireEvent.change(getByPlaceholderText(/name@email.com/i), {
      target: { value: 'goodemail@email.com' }
    });

    fireEvent.click(getByText(/send instructions/i));

    const apiVal = await findByText(/email sent/i);

    expect(container.contains(apiVal)).toBeTruthy();
    expect(axios.post).toHaveBeenCalledTimes(1);
    axios.post.mockClear();
  });
});
