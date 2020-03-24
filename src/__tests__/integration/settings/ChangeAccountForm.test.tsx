import React from 'react';
import Settings from '../../../pages/Settings';
import ChangeAccountForm from '../../../components/settings/ChangeAccountForm';
import { fireEvent, cleanup, wait } from '@testing-library/react';
import wrapper from '../../../__testUtils__/wrapper';
import { reducer } from '../../../reducers/index';
import { ChangeEmailSchema, ChangePasswordSchema } from 'src/utils/validators';
import { changeEmailQuery } from 'src/utils/queries';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

const props = {
  setState: () => {},
  schema: ChangeEmailSchema,
  api: changeEmailQuery,
  labels: { old: 'Old Email', new: 'New Email', confirm: 'Confirm Email' },
  pwLabels: {
    old: 'Old Password',
    new: 'New Password',
    confirm: 'Confirm Password'
  },
  inputType: 'email',
  pwInputType: 'password'
};

describe('Change email', () => {
  afterEach(cleanup);

  test('can open and close change email popover', () => {
    const { queryByText, getByText, getByTestId } = wrapper(
      reducer,
      <Settings />
    );

    expect(queryByText(/confirm email/i)).toBeFalsy();
    fireEvent.click(getByText(/change email.../i));
    expect(queryByText(/confirm email/i)).toBeTruthy();
    fireEvent.click(getByTestId(/^close$/i));
    wait(() => expect(queryByText(/confirm email/i)).toBeFalsy());
  });

  test('can type in inputs', () => {
    const { getAllByTestId } = wrapper(
      reducer,
      <ChangeAccountForm
        schema={props.schema}
        setState={props.setState}
        api={props.api}
        labels={props.labels}
        inputType={props.inputType}
      />
    );

    const inputs = getAllByTestId(/input/i) as Array<HTMLInputElement>;
    const old = inputs[0];
    const newE = inputs[1];
    const confirm = inputs[2];

    fireEvent.change(old, { target: { value: 'old' } });
    expect(old.value).toEqual('old');

    fireEvent.change(newE, { target: { value: 'new' } });
    expect(newE.value).toEqual('new');

    fireEvent.change(confirm, { target: { value: 'new' } });
    expect(confirm.value).toEqual('new');
  });

  test('field errors for change email', async () => {
    const { getByTestId, getAllByTestId, getByText, queryByText } = wrapper(
      reducer,
      <ChangeAccountForm
        schema={props.schema}
        setState={props.setState}
        api={props.api}
        labels={props.labels}
        inputType={props.inputType}
      />
    );

    fireEvent.click(getByTestId(/button/i));

    await wait(() => expect(getByText(/enter old email/i)).toBeTruthy());
    expect(getByText(/enter new email/i)).toBeTruthy();

    const inputs = getAllByTestId(/input/i) as Array<HTMLInputElement>;
    const old = inputs[0];
    const newE = inputs[1];
    const confirm = inputs[2];

    fireEvent.change(old, { target: { value: 'old' } });
    await wait(() => expect(getByText(/invalid email/i)).toBeTruthy());
    fireEvent.change(old, { target: { value: 'old@email.com' } });
    await wait(() => expect(queryByText(/invalid email/i)).toBeFalsy());
    fireEvent.change(newE, { target: { value: 'new' } });
    await wait(() => expect(getByText(/invalid email/i)).toBeTruthy());
    fireEvent.change(confirm, { target: { value: 'confirm' } });
    await wait(() => expect(getByText(/match new email/i)).toBeTruthy());
  });

  test('field errors for change password', async () => {
    const { getByTestId, getAllByTestId, getByText } = wrapper(
      reducer,
      <ChangeAccountForm
        schema={ChangePasswordSchema}
        setState={props.setState}
        api={props.api}
        labels={props.pwLabels}
        inputType={props.pwInputType}
      />
    );

    await act(async () => {
      fireEvent.click(getByTestId(/button/i));
    });

    await wait(() => expect(getByText(/enter old password/i)).toBeTruthy());
    expect(getByText(/enter new password/i)).toBeTruthy();

    const inputs = getAllByTestId(/input/i) as Array<HTMLInputElement>;
    const newE = inputs[1];
    const confirm = inputs[2];

    fireEvent.change(newE, { target: { value: 'new' } });
    await wait(() => expect(getByText(/six char minimum/i)).toBeTruthy());
    fireEvent.change(confirm, { target: { value: 'confirm' } });
    await wait(() => expect(getByText(/match new password/i)).toBeTruthy());
  });

  test('renders passed-in labels', () => {
    const { getByText } = wrapper(
      reducer,
      <ChangeAccountForm
        schema={props.schema}
        setState={props.setState}
        api={props.api}
        labels={props.labels}
        inputType={props.inputType}
      />
    );

    expect(getByText(/confirm email/i)).toBeTruthy();
    expect(getByText(/new email/i)).toBeTruthy();
    expect(getByText(/old email/i)).toBeTruthy();
  });

  test('applies passed-in input types', () => {
    const { getAllByTestId } = wrapper(
      reducer,
      <ChangeAccountForm
        schema={props.schema}
        setState={props.setState}
        api={props.api}
        labels={props.labels}
        inputType={props.inputType}
      />
    );

    const inputs = getAllByTestId(/input/i) as Array<HTMLInputElement>;
    const old = inputs[0];
    const newE = inputs[1];
    const confirm = inputs[2];

    expect(old).toHaveAttribute('type', 'email');
    expect(newE).toHaveAttribute('type', 'email');
    expect(confirm).toHaveAttribute('type', 'email');
  });

  test('rejected form submission', async () => {
    mockAxios.put.mockRejectedValue({
      response: { data: { error: 'test error' } }
    });
    const { getAllByTestId, getByTestId, getByText } = wrapper(
      reducer,
      <ChangeAccountForm
        schema={props.schema}
        setState={props.setState}
        api={props.api}
        labels={props.labels}
        inputType={props.inputType}
      />
    );

    const inputs = getAllByTestId(/input/i) as Array<HTMLInputElement>;
    const old = inputs[0];
    const newE = inputs[1];
    const confirm = inputs[2];

    fireEvent.change(old, { target: { value: 'foo@bar.com' } });
    fireEvent.change(newE, { target: { value: 'bar@baz.com' } });
    fireEvent.change(confirm, { target: { value: 'bar@baz.com' } });

    await act(async () => {
      await fireEvent.click(getByTestId(/button/i));
    });

    await wait(() => expect(getByText(/test error/i)).toBeTruthy());
  });

  test('accepted form submission', async () => {
    mockAxios.put.mockResolvedValue({ data: { message: 'test accept' } });
    const { getAllByTestId, getByTestId, getByText } = wrapper(
      reducer,
      <ChangeAccountForm
        schema={props.schema}
        setState={props.setState}
        api={props.api}
        labels={props.labels}
        inputType={props.inputType}
      />
    );

    const inputs = getAllByTestId(/input/i) as Array<HTMLInputElement>;
    const old = inputs[0];
    const newE = inputs[1];
    const confirm = inputs[2];

    fireEvent.change(old, { target: { value: 'foo@bar.com' } });
    fireEvent.change(newE, { target: { value: 'bar@baz.com' } });
    fireEvent.change(confirm, { target: { value: 'bar@baz.com' } });

    fireEvent.click(getByTestId(/button/i));

    await wait(() => expect(getByText(/test accept/i)).toBeTruthy());
  });
});
