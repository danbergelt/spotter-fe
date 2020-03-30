import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import {
  fetchExercisesAction,
  createExerciseAction,
  deleteExerciseAction
} from 'src/actions/fetchExercisesActions';
import {
  FETCH_EXERCISES,
  CREATE_EXERCISE,
  DELETE_SAVED_EXERCISE
} from '../../../constants/index';
import { createMemoryHistory } from 'history';

const mockStore = configureMockStore();

describe('fetch exercises', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('creates proper action types for successful fetch', () => {
    const expectedActions = [{ type: FETCH_EXERCISES, payload: 'foo' }];

    const store = mockStore();

    store.dispatch(fetchExercisesAction('foo'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('creates exercise', () => {
    const expectedActions = [{ type: CREATE_EXERCISE, payload: 'foo' }];

    const store = mockStore();

    store.dispatch(createExerciseAction('foo'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('deletes exercise', () => {
    const expectedActions = [{ type: DELETE_SAVED_EXERCISE, payload: 'foo' }];

    const store = mockStore();

    store.dispatch(deleteExerciseAction('foo'));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
