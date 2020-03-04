import React from 'react';
import App from '../../../App';
import ContactForm from '../../../components/contact/ContactForm';
import { cleanup, fireEvent, wait } from '@testing-library/react';
import wrapper from '../../../__testUtils__/wrapper';
import { reducer } from '../../../reducers/index';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('can close modal on delete click', () => {
  // initial setup
  afterEach(cleanup);

  test('open and close contact modal', async () => {
    mockAxios.get.mockResolvedValue({ data: { token: null } });
    const { getByTestId, queryByTestId, queryByText } = wrapper(
      reducer,
      <App />
    );
    await wait(() => expect(queryByText(/lifting pal/i)).toBeTruthy());
    expect(queryByTestId(/contact-form/i)).toBeFalsy();
    fireEvent.click(getByTestId(/contact-button/i));
    await wait(() => expect(queryByTestId(/contact-form/i)).toBeTruthy());
    fireEvent.click(getByTestId(/contact-button/i));
    await wait(() => expect(queryByTestId(/contact-form/i)).toBeFalsy());
  });

  test('contact form renders empty inputs', () => {
    const { getByPlaceholderText } = wrapper(
      reducer,
      <ContactForm form={true} />
    );

    const name = getByPlaceholderText(/Jane Doe/i);
    const email = getByPlaceholderText(/name@email.com/i);
    const subject = getByPlaceholderText(/e.g. feature request/i);
    const message = getByPlaceholderText(/your message goes here.../i);

    expect(name.getAttribute('value')).toBe('');
    expect(email.getAttribute('value')).toBe('');
    expect(subject.getAttribute('value')).toBe('');

    // unsure of why the text area is requiring null
    expect(message.getAttribute('value')).toBe(null);
  });

  test('fields can be typed in', async () => {
    const { container, getByPlaceholderText } = wrapper(
      reducer,
      <ContactForm form={true} />
    );

    const name = getByPlaceholderText(/Jane Doe/i);
    const email = getByPlaceholderText(/name@email.com/i);
    const subject = getByPlaceholderText(/e.g. feature request/i);
    const message = getByPlaceholderText(/your message goes here.../i);

    fireEvent.change(name, {
      target: { value: 'foo' }
    });

    fireEvent.change(email, {
      target: { value: 'bar' }
    });

    fireEvent.change(subject, {
      target: { value: 'baz' }
    });

    // workaround for how this specific input is wired up with Formik
    await userEvent.type(message, 'qux');
    message.focus();

    expect(name.getAttribute('value')).toBe('foo');
    expect(email.getAttribute('value')).toBe('bar');
    expect(subject.getAttribute('value')).toBe('baz');
    expect(container.innerHTML).toMatch(/qux/i);
  });

  test('touched field validation', async () => {
    const { getByTestId, findByText, getByPlaceholderText } = wrapper(
      reducer,
      <ContactForm form={true} />
    );

    fireEvent.click(getByTestId(/button/i));

    await findByText(/name is required/i);
    await findByText(/email is required/i);
    await findByText(/subject is required/i);
    await findByText(/message is required/i);

    fireEvent.change(getByPlaceholderText(/name@email.com/i), {
      target: { value: 'foo' }
    });

    await findByText(/invalid email/i);
  });

  test('successful submission', async () => {
    mockAxios.post.mockResolvedValue({ data: { message: 'success' } });
    const { findByText, getByTestId, getByPlaceholderText } = wrapper(
      reducer,
      <ContactForm form={true} />
    );

    const name = getByPlaceholderText(/Jane Doe/i);
    const email = getByPlaceholderText(/name@email.com/i);
    const subject = getByPlaceholderText(/e.g. feature request/i);
    const message = getByPlaceholderText(/your message goes here.../i);

    fireEvent.change(name, {
      target: { value: 'foo' }
    });

    fireEvent.change(email, {
      target: { value: 'bar@email.com' }
    });

    fireEvent.change(subject, {
      target: { value: 'baz' }
    });

    fireEvent.change(message, {
      target: { value: 'qux' }
    });

    fireEvent.click(getByTestId(/button/i));

    await findByText(/success/i);
  });

  test('rejected submission', async () => {
    mockAxios.post.mockRejectedValue({
      response: { data: { error: 'rejected' } }
    });
    const { findByText, getByTestId, getByPlaceholderText } = wrapper(
      reducer,
      <ContactForm form={true} />
    );

    const name = getByPlaceholderText(/Jane Doe/i);
    const email = getByPlaceholderText(/name@email.com/i);
    const subject = getByPlaceholderText(/e.g. feature request/i);
    const message = getByPlaceholderText(/your message goes here.../i);

    fireEvent.change(name, {
      target: { value: 'foo' }
    });

    fireEvent.change(email, {
      target: { value: 'bar@email.com' }
    });

    fireEvent.change(subject, {
      target: { value: 'baz' }
    });

    fireEvent.change(message, {
      target: { value: 'qux' }
    });

    fireEvent.click(getByTestId(/button/i));

    await findByText(/rejected/i);
  });
});
