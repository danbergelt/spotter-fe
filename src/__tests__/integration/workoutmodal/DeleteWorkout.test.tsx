import React from 'react';
import wrapper from 'src/__testUtils__/wrapper';
import { reducer } from 'src/reducers';
import DeleteWorkout from 'src/components/dash/workoutmodal/actions/deleteworkout/DeleteWorkout';
import { MODAL_CTX } from 'src/actions/globalActions';
import { fireEvent, wait } from '@testing-library/dom';
import axios from 'axios';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

const closeParentModal = jest.fn();
const workoutId = 'foo';
const nudgeLeft = jest.fn();
const nudgeBottom = jest.fn();

describe('delete workout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('closes modal when context is add', () => {
    const { store, getByText } = wrapper(
      reducer,
      <DeleteWorkout
        nudgeLeft={nudgeLeft}
        nudgeBottom={nudgeBottom}
        closeParentModal={closeParentModal}
        workoutId={workoutId}
      />
    );

    store.dispatch({ type: MODAL_CTX, payload: 'add' });

    fireEvent.click(getByText(/delete/i));

    expect(closeParentModal).toHaveBeenCalledTimes(1);
  });

  test('deletes workout when context is view', async () => {
    mockAxios.delete.mockResolvedValue({
      data: { workout: { _id: 'foobar' } }
    });

    const { store, getByText, getByTestId } = wrapper(
      reducer,
      <DeleteWorkout
        nudgeLeft={nudgeLeft}
        nudgeBottom={nudgeBottom}
        closeParentModal={closeParentModal}
        workoutId={workoutId}
      />
    );

    store.dispatch({ type: MODAL_CTX, payload: 'view' });

    fireEvent.click(getByText(/delete/i));

    const btn = getByTestId(/button/i);

    fireEvent.click(btn);

    await wait(() => expect(closeParentModal).toHaveBeenCalledTimes(1));
  });

  test('handles rejection', async () => {
    mockAxios.delete.mockRejectedValue({
      response: { data: { error: 'foobar' } }
    });
    const { store, getByText, getByTestId } = wrapper(
      reducer,
      <DeleteWorkout
        nudgeLeft={nudgeLeft}
        nudgeBottom={nudgeBottom}
        closeParentModal={closeParentModal}
        workoutId={workoutId}
      />
    );

    store.dispatch({ type: MODAL_CTX, payload: 'view' });

    fireEvent.click(getByText(/delete/i));

    const btn = getByTestId(/button/i);

    fireEvent.click(btn);

    await wait(() => expect(getByText(/foobar/i)).toBeTruthy());
  });

  test('can exit popup', () => {
    const { store, getByText, queryByTestId, getByTestId } = wrapper(
      reducer,
      <DeleteWorkout
        nudgeLeft={nudgeLeft}
        nudgeBottom={nudgeBottom}
        closeParentModal={closeParentModal}
        workoutId={workoutId}
      />
    );

    store.dispatch({ type: MODAL_CTX, payload: 'view' });

    fireEvent.click(getByText(/delete/i));

    expect(queryByTestId(/button/i)).toBeTruthy();

    fireEvent.click(getByTestId(/x/i));

    expect(queryByTestId(/button/i)).toBeFalsy();
  });
});
