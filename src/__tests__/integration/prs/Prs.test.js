import React from 'react';
import Routes from '../../../routes';
import Prs from '../../../pages/Prs';
import { fireEvent, cleanup, wait } from '@testing-library/react';
import wrapper from '../../../__testUtils__/wrapper';
import { reducer } from '../../../reducers/index';
import axios from 'axios';
import { ADD_TOKEN } from '../../../actions/addTokenActions';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { FETCH_EXERCISES_SUCCESS } from '../../../actions/fetchExercisesActions';

const moment = extendMoment(Moment);

describe('Prs page functionality', () => {
  afterEach(cleanup);

  test('can navigate to prs page', () => {
    axios.post.mockResolvedValue({});
    axios.get.mockResolvedValue({});
    const { getByText, history, store } = wrapper(reducer, <Routes />);

    store.dispatch({ type: ADD_TOKEN, payload: 'token' });

    fireEvent.click(getByText(/personal bests/i));
    expect(history.location.pathname).toEqual('/prs');
  });

  test('displays pr', async () => {
    axios.get.mockResolvedValue({});
    const { getByText, queryByText, store } = wrapper(reducer, <Prs />);

    store.dispatch({ type: ADD_TOKEN, payload: 'token' });

    store.dispatch({
      type: FETCH_EXERCISES_SUCCESS,
      payload: [
        { name: 'squat', prDate: moment().format('MMM DD YYYY'), pr: 100 },
        {
          name: 'deadlift',
          prDate: moment()
            .subtract(2, 'months')
            .format('MMM DD YYYY'),
          pr: 100
        },
        {
          name: 'bench',
          prDate: moment()
            .subtract(2, 'years')
            .format('MMM DD YYYY'),
          pr: 100
        }
      ]
    });

    await wait(() => getByText(/last month/i));

    expect(queryByText(/squat/i)).toBeTruthy();

    expect(queryByText(/deadlift/i)).toBeTruthy();

    expect(queryByText(/bench/i)).toBeTruthy();
  });

  test('displays no range found', async () => {
    axios.get.mockResolvedValue({});
    const { getByText, getAllByText, store } = wrapper(reducer, <Prs />);

    store.dispatch({ type: ADD_TOKEN, payload: 'token' });

    store.dispatch({
      type: FETCH_EXERCISES_SUCCESS,
      payload: [
        {
          name: 'deadlift',
          prDate: moment()
            .subtract(2, 'months')
            .format('MMM DD YYYY')
        },
        {
          name: 'bench',
          prDate: moment()
            .subtract(2, 'years')
            .format('MMM DD YYYY')
        }
      ]
    });

    await wait(() => getByText(/last month/i));

    expect(getAllByText(/no prs found in this range/i)).toBeTruthy();
  });
});
