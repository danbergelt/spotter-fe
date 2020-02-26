import React from 'react';
import Routes from '../../../routes';
import WorkoutGrid from '../../../components/dash/workouts/month/WorkoutGrid';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { cleanup, fireEvent, wait } from '@testing-library/react';
import wrapper from '../../../__testUtils__/wrapper';
import mockWorkoutRes from '../../../__testUtils__/mockWorkoutRes';
import mockMultipleWorkouts from '../../../__testUtils__/mockMultipleWorkouts';
import axios from 'axios';
import Modal from 'react-modal';
import { reducer } from '../../../reducers/index.ts';
import { SET_SCOPE } from '../../../actions/globalActions';
import { ADD_TOKEN } from '../../../actions/addTokenActions';
import { FETCH_WORKOUTS_SUCCESS } from '../../../actions/fetchWorkoutsActions';
import { act } from 'react-dom/test-utils';

describe('Weekly dash date settings', () => {
  afterEach(() => {
    cleanup;
    jest.clearAllMocks();
  });

  Modal.setAppElement(document.createElement('div'));

  const moment = extendMoment(Moment);

  it('can go back in time', () => {
    axios.post.mockResolvedValue(mockWorkoutRes);
    const {
      container,
      getByText,
      getByTestId,
      queryByTestId,
      history,
      store
    } = wrapper(reducer, <Routes />);

    store.dispatch({ type: ADD_TOKEN, payload: 'token' });
    store.dispatch({
      type: SET_SCOPE,
      payload: { value: 'Month', label: 'Month' }
    });

    history.push('/dashboard');

    expect(container.contains(getByText(/month/i))).toBeTruthy();

    expect(
      container.contains(
        queryByTestId(
          moment()
            .startOf('month')
            .format('MMM DD YYYY')
        )
      )
    ).toBeTruthy();

    fireEvent.click(getByTestId(/back/i));

    expect(
      container.contains(
        queryByTestId(
          moment()
            .add(-1, 'months')
            .startOf('month')
            .format('MMM DD YYYY')
        )
      )
    ).toBeTruthy();
    expect(
      container.contains(
        queryByTestId(
          moment()
            .add(-2, 'months')
            .startOf('month')
            .format('MMM DD YYYY')
        )
      )
    ).toBeFalsy();
  });

  it('can go forward in time', () => {
    axios.post.mockResolvedValue(mockWorkoutRes);
    const {
      container,
      getByText,
      getByTestId,
      queryByTestId,
      history,
      store
    } = wrapper(reducer, <Routes />);

    store.dispatch({ type: ADD_TOKEN, payload: 'token' });
    store.dispatch({
      type: SET_SCOPE,
      payload: { value: 'Month', label: 'Month' }
    });

    history.push('/dashboard');

    expect(container.contains(getByText(/month/i))).toBeTruthy();
    expect(
      container.contains(
        queryByTestId(
          moment()
            .startOf('month')
            .format('MMM DD YYYY')
        )
      )
    ).toBeTruthy();

    fireEvent.click(getByTestId(/forward/i));

    expect(
      container.contains(
        queryByTestId(
          moment()
            .add(1, 'months')
            .startOf('month')
            .format('MMM DD YYYY')
        )
      )
    ).toBeTruthy();
    expect(
      container.contains(
        queryByTestId(
          moment()
            .startOf('month')
            .format('MMM DD YYYY')
        )
      )
    ).toBeFalsy();
    expect(
      container.contains(
        queryByTestId(
          moment()
            .add(3, 'months')
            .startOf('month')
            .format('MMM DD YYYY')
        )
      )
    ).toBeFalsy();
  });

  it('fetches workouts and displays them', async () => {
    axios.post.mockResolvedValue({});
    const { queryByText, store } = wrapper(reducer, <WorkoutGrid />);

    store.dispatch({
      type: FETCH_WORKOUTS_SUCCESS,
      payload: mockWorkoutRes.data.workouts
    });

    expect(queryByText(/workout for testing/i)).toBeTruthy();
  });

  it('opens add workout modal', async () => {
    axios.post.mockResolvedValue({});
    axios.get.mockResolvedValue({});
    const { store, getByTestId } = wrapper(reducer, <WorkoutGrid />);

    await act(
      async () => await fireEvent.click(getByTestId(/add-for-testing/i))
    );

    expect(store.getState().globalReducer.ctx).toEqual('add');
  });

  it('opens view workout modal', async () => {
    axios.get.mockResolvedValue({});
    axios.post.mockResolvedValue({});
    const { store, getByText } = wrapper(reducer, <WorkoutGrid />);

    store.dispatch({
      type: FETCH_WORKOUTS_SUCCESS,
      payload: mockWorkoutRes.data.workouts
    });

    await act(
      async () => await fireEvent.click(getByText(/workout for testing/i))
    );

    expect(store.getState().globalReducer.ctx).toEqual('view');
  });

  it('handles multiple workouts', () => {
    axios.get.mockResolvedValue({});
    axios.post.mockResolvedValue({});

    const { store, getByText, queryByText, getByTestId } = wrapper(
      reducer,
      <WorkoutGrid />
    );

    store.dispatch({
      type: FETCH_WORKOUTS_SUCCESS,
      payload: mockMultipleWorkouts.data.workouts
    });

    fireEvent.click(getByText(/view more/i));

    expect(queryByText(/workout for testing 2/i)).toBeTruthy();

    fireEvent.click(getByTestId(/close-popover/i));

    wait(() => expect(queryByText(/workout for testing 2/i)).toBeFalsy());

    fireEvent.click(getByText(/view more/i));

    fireEvent.click(getByText(/workout for testing 2/i));

    wait(() => expect(queryByText(/notes for testing 2/i)).toBeTruthy());
  });
});
