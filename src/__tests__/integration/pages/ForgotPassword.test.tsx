import React from 'react';
import ForgotPassword from '../../../pages/ForgotPassword';
import { reducer } from '../../../reducers/index';
import axios from 'axios';
import wrapper from '../../../__testUtils__/wrapper';
import { cleanup, fireEvent, wait } from '@testing-library/react';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('Forgot password instructions', () => {
  afterEach(cleanup);

  test('forgot password page renders empty input', () => {
    const { getByPlaceholderText } = wrapper(reducer, <ForgotPassword />);
    const email = getByPlaceholderText(/name@email.com/i);
    expect(email.getAttribute('value')).toBe('');
  });

  test('fields can be typed in', () => {
    const { getByPlaceholderText } = wrapper(reducer, <ForgotPassword />);
    const email = getByPlaceholderText(/name@email.com/i);
    fireEvent.change(email, {
      target: { value: 'test@input.com' }
    });
    expect(email.getAttribute('value')).toBe('test@input.com');
  });

  test('attempt with invalid credentials', async () => {
    // mock err response
    mockAxios.post.mockRejectedValue({
      response: { data: { error: 'Test reject' } }
    });
    const { getByPlaceholderText, getByText, findByText, container } = wrapper(
      reducer,
      <ForgotPassword />
    );
    fireEvent.change(getByPlaceholderText(/name@email.com/i), {
      target: { value: 'bademail@email.com' }
    });
    fireEvent.click(getByText(/send instructions/i));
    const apiVal = await findByText(/test reject/i);
    expect(container.contains(apiVal)).toBeTruthy();
    expect(axios.post).toHaveBeenCalledTimes(1);
    mockAxios.post.mockClear();
  });

  test('successful submission', async () => {
    mockAxios.post.mockResolvedValue({
      data: { message: 'test success' }
    });
    const { getByPlaceholderText, getByText, findByText, container } = wrapper(
      reducer,
      <ForgotPassword />
    );
    fireEvent.change(getByPlaceholderText(/name@email.com/i), {
      target: { value: 'goodemail@email.com' }
    });
    fireEvent.click(getByText(/send instructions/i));
    const apiVal = await findByText(/test success/i);
    expect(container.contains(apiVal)).toBeTruthy();
    expect(axios.post).toHaveBeenCalledTimes(1);
    mockAxios.post.mockClear();
  });

  test('form validation', async () => {
    const { getByText, getByPlaceholderText } = wrapper(
      reducer,
      <ForgotPassword />
    );
    fireEvent.click(getByText(/send instructions/i));
    await wait(() => expect(getByText(/enter your email/i)).toBeTruthy());
    fireEvent.change(getByPlaceholderText(/name@email.com/i), {
      target: { value: 'foobar' }
    });
    await wait(() => expect(getByText(/invalid email/i)).toBeTruthy());
  });
});
