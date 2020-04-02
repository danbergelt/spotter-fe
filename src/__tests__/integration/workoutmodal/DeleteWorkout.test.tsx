import React from 'react';
import wrapper from 'src/__testUtils__/wrapper';
import { reducer } from 'src/reducers';
import DeleteWorkout from 'src/components/dash/workoutmodal/actions/deleteworkout/DeleteWorkout';
import { fireEvent, wait } from '@testing-library/dom';
import axios from 'axios';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

const closeModal = jest.fn();
const workoutId = 'foo';
const nudgeLeft = jest.fn();
const nudgeBottom = jest.fn();

describe('delete workout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('closes modal when context is add', () => {
    const { getByText } = wrapper(
      reducer,
      <DeleteWorkout
        ctx='add'
        nudgeLeft={nudgeLeft}
        nudgeBottom={nudgeBottom}
        closeModal={closeModal}
        workoutId={workoutId}
      />
    );

    fireEvent.click(getByText(/delete/i));

    expect(closeModal).toHaveBeenCalledTimes(1);
  });

  test('deletes workout when context is view', async () => {
    mockAxios.delete.mockResolvedValue({
      data: { workout: { _id: 'foobar' } }
    });

    const { getByText, getByTestId } = wrapper(
      reducer,
      <DeleteWorkout
        ctx='view'
        nudgeLeft={nudgeLeft}
        nudgeBottom={nudgeBottom}
        closeModal={closeModal}
        workoutId={workoutId}
      />
    );

    fireEvent.click(getByText(/delete/i));

    const btn = getByTestId(/button/i);

    fireEvent.click(btn);

    await wait(() => expect(closeModal).toHaveBeenCalledTimes(1));
  });

  test('handles rejection', async () => {
    mockAxios.delete.mockRejectedValue({
      response: { data: { error: 'foobar' } }
    });
    const { getByText, getByTestId } = wrapper(
      reducer,
      <DeleteWorkout
        ctx='view'
        nudgeLeft={nudgeLeft}
        nudgeBottom={nudgeBottom}
        closeModal={closeModal}
        workoutId={workoutId}
      />
    );

    fireEvent.click(getByText(/delete/i));

    const btn = getByTestId(/button/i);

    fireEvent.click(btn);

    await wait(() => expect(getByText(/foobar/i)).toBeTruthy());
  });

  test('can exit popup', () => {
    const { getByText, queryByTestId, getByTestId } = wrapper(
      reducer,
      <DeleteWorkout
        ctx='view'
        nudgeLeft={nudgeLeft}
        nudgeBottom={nudgeBottom}
        closeModal={closeModal}
        workoutId={workoutId}
      />
    );

    fireEvent.click(getByText(/delete/i));

    expect(queryByTestId(/button/i)).toBeTruthy();

    fireEvent.click(getByTestId(/x/i));

    expect(queryByTestId(/button/i)).toBeFalsy();
  });
});
