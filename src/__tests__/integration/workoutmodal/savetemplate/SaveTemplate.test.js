import React from 'react';
import axios from 'axios';
import SaveTemplate from '../../../../components/dash/workoutmodal/menu/options/savetemplate/SaveTemplate';
import WorkoutOptions from '../../../../components/dash/workoutmodal/menu/Menu';
import { cleanup, fireEvent, wait } from '@testing-library/react';
import wrapper from '../../../../__testUtils__/wrapper';
import Modal from 'react-modal';
import { reducer } from '../../../../reducers/index';

describe('template save modal functionality', () => {
  afterEach(() => {
    cleanup;
    jest.clearAllMocks();
  });
  Modal.setAppElement(document.createElement('div'));

  test('Can open and close save template modal', () => {
    const { getByTestId, queryByPlaceholderText } = wrapper(
      reducer,
      <WorkoutOptions />
    );

    expect(queryByPlaceholderText(/template name/i)).toBeFalsy();

    fireEvent.click(getByTestId(/save-template/i));

    expect(queryByPlaceholderText(/template name/i)).toBeTruthy();

    fireEvent.click(getByTestId(/quit-template-save/i));

    expect(queryByPlaceholderText(/template name/i)).toBeFalsy();
  });

  test('can type in template save input', () => {
    const { getByPlaceholderText, container, store, debug } = wrapper(
      reducer,
      <SaveTemplate modal={true} />
    );

    const input = getByPlaceholderText(/template name/i);

    fireEvent.change(input, { target: { value: 'testing save input' } });

    expect(container.innerHTML).toMatch('testing save input');
  });

  test('can submit template', async () => {
    axios.post.mockResolvedValue({ data: 'resolved' });

    const { getByPlaceholderText, getByTestId, getByText, store } = wrapper(
      reducer,
      <SaveTemplate modal={true} />
    );

    const input = getByPlaceholderText(/template name/i);

    fireEvent.change(input, { target: { value: 'testing save input' } });

    fireEvent.submit(getByTestId(/template-form/i));

    await wait(() => expect(getByText(/template created/i)).toBeTruthy());
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  test('can show error message on submit', async () => {
    axios.post.mockRejectedValue({ response: { data: { error: 'bad req' } } });
    const { getByPlaceholderText, getByTestId, getByText, store } = wrapper(
      reducer,
      <SaveTemplate modal={true} />
    );

    const input = getByPlaceholderText(/template name/i);

    fireEvent.change(input, { target: { value: 'testing save input' } });

    fireEvent.submit(getByTestId(/template-form/i));

    await wait(() => expect(getByText(/bad req/i)).toBeTruthy());
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  test('resets state on close', async () => {
    axios.post.mockRejectedValue({ response: { data: { error: 'bad req' } } });
    const { container, getByPlaceholderText, getByTestId, getByText } = wrapper(
      reducer,
      <WorkoutOptions />
    );

    fireEvent.click(getByTestId(/save-template/i));

    const input = getByPlaceholderText(/template name/i);

    fireEvent.submit(getByTestId(/template-form/i));
    await wait(() => expect(getByText(/bad req/i)).toBeTruthy());
    fireEvent.change(input, { target: { value: 'testing save input' } });
    expect(container.innerHTML).toMatch('testing save input');

    fireEvent.click(getByTestId(/quit-template-save/i));

    expect(container.innerHTML).not.toMatch('testing save input');
  });
});
