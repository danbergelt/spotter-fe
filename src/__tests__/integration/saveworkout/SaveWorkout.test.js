import React from 'react';
import WorkoutColumns from '../../../components/dash/workouts/week/WorkoutColumns';
import { cleanup, fireEvent } from '@testing-library/react';
import wrapper from '../../../__testUtils__/wrapper';
import Modal from 'react-modal';
import axios from 'axios';
import mockWorkoutRes from '../../../__testUtils__/mockWorkoutRes';
import { FETCH_WORKOUTS_SUCCESS } from '../../../actions/fetchWorkoutsActions';
import { reducer } from '../../../reducers/index';
import { act } from 'react-dom/test-utils';

describe('can save workout', () => {
  // initial setup
  afterEach(cleanup);
  Modal.setAppElement(document.createElement('div'));

  test('can save workout', async () => {
    axios.post.mockResolvedValue({});
    axios.get.mockResolvedValue({});
    const { getByText, store, history, getByTestId, queryByText } = wrapper(
      reducer,
      <WorkoutColumns />
    );

    history.push('/dashboard');

    expect(queryByText(/workout for testing/i)).toBeFalsy();

    fireEvent.click(getByTestId(/modal-click/i));

    await act(async () => {
      await fireEvent.click(getByTestId(/save-workout/i));
    });

    store.dispatch({
      type: FETCH_WORKOUTS_SUCCESS,
      payload: mockWorkoutRes.data.workouts
    });

    expect(getByText(/workout for testing/i)).toBeTruthy();
  });
});
