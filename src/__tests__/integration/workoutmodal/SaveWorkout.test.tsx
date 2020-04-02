import React from 'react';
import wrapper from 'src/__testUtils__/wrapper';
import { reducer } from 'src/reducers';
import SaveWorkout from 'src/components/dash/workoutmodal/actions/saveworkout/SaveWorkout';
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

  test('renders proper button text for add ctx', () => {
    const { getByText } = wrapper(
      reducer,
      <SaveWorkout ctx='add' workoutId={workoutId} closeModal={closeModal} />
    );

    getByText(/save/i);
  });

  test('renders proper button text for view ctx', () => {
    const { getByText } = wrapper(
      reducer,
      <SaveWorkout ctx='view' workoutId={workoutId} closeModal={closeModal} />
    );

    getByText(/update/i);
  });

  test('error renders for save', async () => {
    mockAxios.post.mockRejectedValue({
      response: { data: { error: 'foobar' } }
    });
    const { getByText } = wrapper(
      reducer,
      <SaveWorkout ctx='add' workoutId={workoutId} closeModal={closeModal} />
    );

    fireEvent.click(getByText(/save/i));

    await wait(() => expect(getByText(/foobar/i)).toBeTruthy());
  });

  test('error renders for update', async () => {
    mockAxios.put.mockRejectedValue({
      response: { data: { error: 'foobar' } }
    });
    const { getByText } = wrapper(
      reducer,
      <SaveWorkout ctx='view' workoutId={workoutId} closeModal={closeModal} />
    );

    fireEvent.click(getByText(/update/i));

    await wait(() => expect(getByText(/foobar/i)).toBeTruthy());
  });

  test('successful update request closes parent modal', async () => {
    mockAxios.put.mockResolvedValue({
      data: { message: 'foobar' }
    });
    const { getByText } = wrapper(
      reducer,
      <SaveWorkout ctx='view' workoutId={workoutId} closeModal={closeModal} />
    );

    fireEvent.click(getByText(/update/i));

    await wait(() => expect(closeModal).toHaveBeenCalledTimes(1));
  });

  test('successful save request closes parent modal', async () => {
    mockAxios.post.mockResolvedValue({
      data: { message: 'foobar' }
    });
    const { getByText } = wrapper(
      reducer,
      <SaveWorkout ctx='add' workoutId={workoutId} closeModal={closeModal} />
    );

    fireEvent.click(getByText(/save/i));

    await wait(() => expect(closeModal).toHaveBeenCalledTimes(1));
  });
});
