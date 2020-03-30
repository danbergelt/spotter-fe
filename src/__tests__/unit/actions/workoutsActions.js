import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import mockWorkoutRes from '../../../__testUtils__/mockWorkoutRes';
import {
  deleteWorkoutAction,
  fetchWorkoutsAction
} from 'src/actions/workoutsActions';
import { DELETE_WORKOUT, FETCH_WORKOUTS } from 'src/constants/index';
import { createMemoryHistory } from 'history';

const mockStore = configureMockStore();

describe('fetch workouts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetch workouts action', async () => {
    const expectedActions = [{ type: FETCH_WORKOUTS, payload: 'foo' }];

    const store = mockStore();

    await store.dispatch(fetchWorkoutsAction('foo'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('delete workout action', async () => {
    const expectedActions = [{ type: DELETE_WORKOUT, payload: 'foo' }];

    const store = mockStore();

    store.dispatch(deleteWorkoutAction('foo'));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
