import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import mockWorkoutRes from '../../../__testUtils__/mockWorkoutRes';
import {
  DELETE_WORKOUT,
  deleteWorkoutAction,
  FETCH_WORKOUTS,
  fetchWorkoutsAction
} from '../../../actions/fetchWorkoutsActions';
import { createMemoryHistory } from 'history';

const mockStore = configureMockStore([thunk]);

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
