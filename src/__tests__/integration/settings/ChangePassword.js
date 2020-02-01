import React from 'react';
import Settings from '../../../pages/Settings';
import ChangePasswordContent from '../../../components/settings/changepassword/ChangePasswordContent';
import { fireEvent, cleanup, wait } from '@testing-library/react';
import wrapper from '../../../__testUtils__/wrapper';
import { reducer } from '../../../reducers/index';
import { ADD_TOKEN } from '../../../actions/addTokenActions';

describe('Change password', () => {
  afterEach(cleanup);

  test('can open change password popover', () => {
    const { queryByText, getByText, store } = wrapper(reducer, <Settings />);

    store.dispatch({ type: ADD_TOKEN, payload: 'token' });

    expect(queryByText(/confirm password/i)).toBeFalsy();

    fireEvent.click(getByText(/change password.../i));

    expect(queryByText(/confirm password/i)).toBeTruthy();
  });

  test('can close change password popover', () => {
    const { queryByText, getByText, getByTestId, store } = wrapper(
      reducer,
      <Settings />
    );

    store.dispatch({ type: ADD_TOKEN, payload: 'token' });

    expect(queryByText(/confirm password/i)).toBeFalsy();

    fireEvent.click(getByText(/change password.../i));

    expect(queryByText(/confirm password/i)).toBeTruthy();

    fireEvent.click(getByTestId(/close-popover/i));

    wait(() => expect(queryByText(/confirm password/i)).toBeFalsy());
  });

  test('can type in inputs', () => {
    const { getByTestId } = wrapper(reducer, <ChangePasswordContent />);

    const old = getByTestId(/old/i);
    const newP = getByTestId(/new/i);
    const confirm = getByTestId(/confirm/i);

    fireEvent.change(old, { target: { value: 'old password' } });
    expect(old.value).toEqual('old password');

    fireEvent.change(newP, { target: { value: 'new password' } });
    expect(newP.value).toEqual('new password');

    fireEvent.change(confirm, { target: { value: 'new password' } });
    expect(confirm.value).toEqual('new password');
  });

  test('field errors', async () => {
    const { getByTestId, getByText } = wrapper(
      reducer,
      <ChangePasswordContent />
    );

    const old = getByTestId(/old/i);
    const newP = getByTestId(/new/i);
    const confirm = getByTestId(/confirm/i);

    fireEvent.click(getByTestId(/save/i));

    await wait(() =>
      expect(getByText(/enter your new password/i)).toBeTruthy()
    );

    fireEvent.change(old, { target: { value: 'old password' } });

    fireEvent.change(newP, { target: { value: 'abc' } });

    fireEvent.change(confirm, { target: { value: 'abc' } });

    fireEvent.click(getByTestId(/save/i));

    await wait(() => expect(getByText(/six character/i)).toBeTruthy());
  });
});
