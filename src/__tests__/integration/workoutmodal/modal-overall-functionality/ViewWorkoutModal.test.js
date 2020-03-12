import React from 'react';
import Dashboard from '../../../../pages/Dashboard';
import { cleanup, fireEvent } from '@testing-library/react';
import wrapper from '../../../../__testUtils__/wrapper';
import Modal from 'react-modal';
import axios from 'axios';
import mockWorkoutRes from '../../../../__testUtils__/mockWorkoutRes';
import { FETCH_WORKOUTS } from '../../../../actions/fetchWorkoutsActions';
import { reducer } from '../../../../reducers/index';
import { act } from 'react-dom/test-utils';

describe('view workout modal functionality', () => {
  // initial setup
  afterEach(cleanup);
  Modal.setAppElement(document.createElement('div'));

  test('modal populates with saved workout when clicked', async () => {
    axios.get.mockResolvedValue({});
    axios.post.mockResolvedValue({});
    const { queryAllByText, queryByText, getByText, store, history } = wrapper(
      reducer,
      <Dashboard />
    );

    store.dispatch({
      type: FETCH_WORKOUTS,
      payload: mockWorkoutRes.data.workouts
    });

    history.push('/dashboard');

    await act(
      async () => await fireEvent.click(getByText(/workout for testing/i))
    );

    expect(queryByText(/exercise2/i)).toBeTruthy();
    expect(queryAllByText(/tag2/i)).toBeTruthy();
    expect(queryByText(/workout for testing/i)).toBeTruthy();
    expect(queryByText(/notes for workout/i)).toBeTruthy();
  });
});
