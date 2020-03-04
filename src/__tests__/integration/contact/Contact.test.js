import React from 'react';
import App from '../../../App';
import ContactForm from '../../../components/contact/Contact';
import { cleanup, fireEvent, wait } from '@testing-library/react';
import wrapper from '../../../__testUtils__/wrapper';
import { reducer } from '../../../reducers/index';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

describe('can close modal on delete click', () => {
  // initial setup
  afterEach(cleanup);

  test('open and close contact modal', async () => {
    axios.get.mockResolvedValue({ data: { token: null } });
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
    const { getByPlaceholderText } = wrapper(reducer, <ContactForm />);

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
      <ContactForm />
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
    const { container, getByPlaceholderText, findByText } = wrapper(
      reducer,
      <ContactForm />
    );

    const name = getByPlaceholderText(/Jane Doe/i);
    const email = getByPlaceholderText(/name@email.com/i);
    const subject = getByPlaceholderText(/e.g. feature request/i);
    const message = getByPlaceholderText(/your message goes here.../i);

    fireEvent.focus(name);
    fireEvent.blur(name);

    const err1 = await findByText(/name is required/i);
    expect(container.contains(err1)).toBeTruthy();

    fireEvent.focus(email);
    fireEvent.blur(email);

    const err2 = await findByText(/email is required/i);
    expect(container.contains(err2)).toBeTruthy();

    fireEvent.focus(subject);
    fireEvent.blur(subject);

    const err3 = await findByText(/subject is required/i);
    expect(container.contains(err3)).toBeTruthy();

    message.focus();
    message.blur();

    const err4 = await findByText(/message is required/i);
    expect(container.contains(err4)).toBeTruthy();
  });
});
