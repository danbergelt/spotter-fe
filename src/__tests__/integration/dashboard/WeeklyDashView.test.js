import React from 'react';
import Routes from '../../../routes';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { cleanup, fireEvent, wait } from '@testing-library/react';
import wrapper from '../../../__testUtils__/wrapper';
import mockWorkoutRes from '../../../__testUtils__/mockWorkoutRes';
import axios from 'axios';
import { reducer } from '../../../reducers/index.ts';
import { ADD_TOKEN } from '../../../actions/addTokenActions';
import { FETCH_WORKOUTS } from '../../../actions/fetchWorkoutsActions';
import WorkoutColumns from '../../../components/dash/workouts/week/WorkoutColumns';
import { act } from 'react-dom/test-utils';

describe('Weekly dash date settings', () => {
  afterEach(() => {
    cleanup;
    jest.clearAllMocks();
  });

  const moment = extendMoment(Moment);

  it('can go back in time', async () => {
    axios.post.mockResolvedValue(mockWorkoutRes);
    const {
      container,
      getByText,
      getByTestId,
      queryByTestId,
      history,
      store
    } = wrapper(reducer, <Routes />);

    await act(async () => {
      await store.dispatch({ type: ADD_TOKEN, payload: 'token' });
    });

    history.push('/dashboard');

    expect(container.contains(getByText(/week/i))).toBeTruthy();
    expect(
      container.contains(
        queryByTestId(
          moment()
            .startOf('week')
            .format('MMM DD YYYY')
        )
      )
    ).toBeTruthy();

    await act(async () => {
      fireEvent.click(getByTestId(/back/i));
    });

    await wait(() => {
      expect(
        container.contains(
          queryByTestId(
            moment()
              .add(-1, 'weeks')
              .startOf('week')
              .format('MMM DD YYYY')
          )
        )
      ).toBeTruthy();
    });

    expect(
      container.contains(
        queryByTestId(
          moment()
            .startOf('week')
            .format('MMM DD YYYY')
        )
      )
    ).toBeFalsy();
    expect(
      container.contains(
        queryByTestId(
          moment()
            .add(-2, 'weeks')
            .startOf('week')
            .format('MMM DD YYYY')
        )
      )
    ).toBeFalsy();

    expect(axios.post).toHaveBeenCalledTimes(2);
  });

  it('can go forward in time', async () => {
    axios.post.mockResolvedValue(mockWorkoutRes);
    const {
      container,
      getByText,
      getByTestId,
      queryByTestId,
      history,
      store
    } = wrapper(reducer, <Routes />);

    await act(async () => {
      await store.dispatch({ type: ADD_TOKEN, payload: 'token' });
    });

    history.push('/dashboard');

    expect(container.contains(getByText(/week/i))).toBeTruthy();
    expect(
      container.contains(
        queryByTestId(
          moment()
            .startOf('week')
            .format('MMM DD YYYY')
        )
      )
    ).toBeTruthy();

    await act(async () => {
      fireEvent.click(getByTestId(/forward/i));
    });

    expect(
      container.contains(
        queryByTestId(
          moment()
            .add(1, 'weeks')
            .startOf('week')
            .format('MMM DD YYYY')
        )
      )
    ).toBeTruthy();
    expect(
      container.contains(
        queryByTestId(
          moment()
            .startOf('week')
            .format('MMM DD YYYY')
        )
      )
    ).toBeFalsy();
    expect(
      container.contains(
        queryByTestId(
          moment()
            .add(2, 'weeks')
            .startOf('week')
            .format('MMM DD YYYY')
        )
      )
    ).toBeFalsy();

    expect(axios.post).toHaveBeenCalledTimes(2);
  });

  it('fetches workouts and displays them', async () => {
    const { history, queryByText, store } = wrapper(
      reducer,
      <WorkoutColumns />
    );

    store.dispatch({
      type: FETCH_WORKOUTS,
      payload: mockWorkoutRes.data.workouts
    });

    history.push('/dashboard');

    await wait(() => {
      expect(queryByText(/workout for testing/i)).toBeTruthy();
    });
  });
});
