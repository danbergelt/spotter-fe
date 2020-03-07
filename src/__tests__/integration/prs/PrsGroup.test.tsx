import React from 'react';
import Prs from '../../../pages/Prs';
import { cleanup, wait } from '@testing-library/react';
import wrapper from '../../../__testUtils__/wrapper';
import { reducer } from '../../../reducers/index';
import axios from 'axios';
import { ADD_TOKEN } from '../../../actions/addTokenActions';
import moment from 'moment';
import { FETCH_EXERCISES } from '../../../actions/fetchExercisesActions';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('Prs page functionality', () => {
  afterEach(cleanup);

  // TO-DO --> move this test to a specific "page" test file to test routing capabilities
  // this file is for integration testing functionality once on the PRs page

  // test('can navigate to prs page', async () => {
  //   mockAxios.post.mockResolvedValue({});
  //   mockAxios.get.mockResolvedValue({});
  //   const { getByText, history, store } = wrapper(reducer, <Routes />);

  //   await act(async () => {
  //     await store.dispatch({ type: ADD_TOKEN, payload: 'token' });
  //   });

  //   await act(async () => {
  //     await fireEvent.click(getByText(/prs/i));
  //   });
  //   expect(history.location.pathname).toEqual('/prs');
  // });

  test('displays pr', async () => {
    mockAxios.get.mockResolvedValue({});
    const { getByText, queryByText, store } = wrapper(reducer, <Prs />);

    store.dispatch({ type: ADD_TOKEN, payload: 'token' });

    store.dispatch({
      type: FETCH_EXERCISES,
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
    mockAxios.get.mockResolvedValue({});
    const { getByText, getAllByText, store } = wrapper(reducer, <Prs />);

    store.dispatch({ type: ADD_TOKEN, payload: 'token' });

    store.dispatch({
      type: FETCH_EXERCISES,
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
