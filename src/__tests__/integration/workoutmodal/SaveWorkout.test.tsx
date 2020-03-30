import React from 'react';
import wrapper from 'src/__testUtils__/wrapper';
import { reducer } from 'src/reducers';
import SaveWorkout from 'src/components/dash/workoutmodal/actions/saveworkout/SaveWorkout';
import { MODAL_CTX } from 'src/constants/index';
import axios from 'axios';
import { fireEvent, wait } from '@testing-library/dom';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

const workoutId = 'foo';
const closeModal = jest.fn();

describe('save workout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders proper button text for different contexts', () => {
    const { getByText, store } = wrapper(
      reducer,
      <SaveWorkout workoutId={workoutId} closeModal={closeModal} />
    );

    store.dispatch({ type: MODAL_CTX, payload: 'add' });

    getByText(/save/i);

    store.dispatch({ type: MODAL_CTX, payload: 'view' });

    getByText(/update/i);
  });

  test('error renders for save', async () => {
    mockAxios.post.mockRejectedValue({
      response: { data: { error: 'foobar' } }
    });
    const { getByText, store } = wrapper(
      reducer,
      <SaveWorkout workoutId={workoutId} closeModal={closeModal} />
    );

    store.dispatch({ type: MODAL_CTX, payload: 'add' });

    fireEvent.click(getByText(/save/i));

    await wait(() => expect(getByText(/foobar/i)).toBeTruthy());
  });

  test('error renders for update', async () => {
    mockAxios.put.mockRejectedValue({
      response: { data: { error: 'foobar' } }
    });
    const { getByText, store } = wrapper(
      reducer,
      <SaveWorkout workoutId={workoutId} closeModal={closeModal} />
    );

    store.dispatch({ type: MODAL_CTX, payload: 'view' });

    fireEvent.click(getByText(/update/i));

    await wait(() => expect(getByText(/foobar/i)).toBeTruthy());
  });

  test('successful update request closes parent modal', async () => {
    mockAxios.put.mockResolvedValue({
      data: { message: 'foobar' }
    });
    const { getByText, store } = wrapper(
      reducer,
      <SaveWorkout workoutId={workoutId} closeModal={closeModal} />
    );

    store.dispatch({ type: MODAL_CTX, payload: 'view' });

    fireEvent.click(getByText(/update/i));

    await wait(() => expect(closeModal).toHaveBeenCalledTimes(1));
  });

  test('successful save request closes parent modal', async () => {
    mockAxios.post.mockResolvedValue({
      data: { message: 'foobar' }
    });
    const { getByText, store } = wrapper(
      reducer,
      <SaveWorkout workoutId={workoutId} closeModal={closeModal} />
    );

    store.dispatch({ type: MODAL_CTX, payload: 'add' });

    fireEvent.click(getByText(/save/i));

    await wait(() => expect(closeModal).toHaveBeenCalledTimes(1));
  });
});
