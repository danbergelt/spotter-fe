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

describe('can update workout', () => {
  // initial setup
  afterEach(cleanup);
  Modal.setAppElement(document.createElement('div'));

  test('can update workout', async () => {
    axios.post.mockResolvedValue({});
    axios.get.mockResolvedValue({});
    const { getByTestId, getByText, store, history } = wrapper(
      reducer,
      <WorkoutColumns />
    );

    store.dispatch({
      type: FETCH_WORKOUTS_SUCCESS,
      payload: mockWorkoutRes.data.workouts
    });

    history.push('/dashboard');

    fireEvent.click(getByText(/workout for testing/i));

    const input = getByTestId(/inp/i);

    fireEvent.change(input, { target: { value: 'testing input' } });

    await act(async () => {
      await fireEvent.click(getByTestId(/save-workout/i));
    });

    store.dispatch({
      type: FETCH_WORKOUTS_SUCCESS,
      payload: [{ ...mockWorkoutRes.data.workouts[0], title: 'testing input' }]
    });

    expect(getByText(/testing input/i)).toBeTruthy();
  });
});
