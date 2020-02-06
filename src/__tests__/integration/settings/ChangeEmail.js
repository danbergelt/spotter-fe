import React from 'react';
import Settings from '../../../pages/Settings';
import ChangeEmailContent from '../../../components/settings/changeemail/ChangeEmailContent';
import { fireEvent, cleanup, wait } from '@testing-library/react';
import wrapper from '../../../__testUtils__/wrapper';
import { reducer } from '../../../reducers/index';
import { ADD_TOKEN } from '../../../actions/addTokenActions';

describe('Change email', () => {
  afterEach(cleanup);

  test('can open change email popover', () => {
    const { queryByText, getByText, store } = wrapper(reducer, <Settings />);

    store.dispatch({ type: ADD_TOKEN, payload: 'token' });

    expect(queryByText(/confirm email/i)).toBeFalsy();

    fireEvent.click(getByText(/change email.../i));

    expect(queryByText(/confirm email/i)).toBeTruthy();
  });

  test('can close change email popover', () => {
    const { queryByText, getByText, getByTestId, store } = wrapper(
      reducer,
      <Settings />
    );

    store.dispatch({ type: ADD_TOKEN, payload: 'token' });

    expect(queryByText(/confirm email/i)).toBeFalsy();

    fireEvent.click(getByText(/change email.../i));

    expect(queryByText(/confirm email/i)).toBeTruthy();

    fireEvent.click(getByTestId(/close-popover/i));

    wait(() => expect(queryByText(/confirm email/i)).toBeFalsy());
  });

  test('can type in inputs', () => {
    const { getByTestId } = wrapper(reducer, <ChangeEmailContent />);

    const old = getByTestId(/old/i);
    const newE = getByTestId(/new/i);
    const confirm = getByTestId(/confirm/i);

    fireEvent.change(old, { target: { value: 'old' } });
    expect(old.value).toEqual('old');

    fireEvent.change(newE, { target: { value: 'new' } });
    expect(newE.value).toEqual('new');

    fireEvent.change(confirm, { target: { value: 'new' } });
    expect(confirm.value).toEqual('new');
  });

  test('field errors', async () => {
    const { getByTestId, getByText } = wrapper(reducer, <ChangeEmailContent />);

    const old = getByTestId(/old/i);
    const newE = getByTestId(/new/i);
    const confirm = getByTestId(/confirm/i);

    fireEvent.change(old, { target: { value: 'old' } });

    fireEvent.change(newE, { target: { value: 'new' } });

    fireEvent.change(confirm, { target: { value: 'new' } });

    fireEvent.click(getByTestId(/save/i));

    await wait(() => expect(getByText(/invalid email/i)).toBeTruthy());
  });
});
