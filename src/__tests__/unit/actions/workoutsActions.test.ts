import configureMockStore from 'redux-mock-store';
import {
  deleteWorkoutAction,
  fetchWorkoutsAction,
  createWorkoutAction,
  editWorkoutAction
} from 'src/actions/workoutsActions';
import {
  DELETE_WORKOUT,
  FETCH_WORKOUTS,
  CREATE_WORKOUT,
  EDIT_WORKOUT
} from 'src/constants/index';
import { workout } from 'src/__testUtils__/workout';

const mockStore = configureMockStore();

describe('fetch workouts', () => {
  test('fetch workouts action', () => {
    const expectedActions = [{ type: FETCH_WORKOUTS, payload: [workout] }];
    const store = mockStore();
    store.dispatch(fetchWorkoutsAction([workout]));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('delete workout action', () => {
    const expectedActions = [{ type: DELETE_WORKOUT, payload: 'foo' }];
    const store = mockStore();
    store.dispatch(deleteWorkoutAction('foo'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('create workout action', () => {
    const expectedActions = [{ type: CREATE_WORKOUT, payload: workout }];
    const store = mockStore();
    store.dispatch(createWorkoutAction(workout));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('edit workout action', () => {
    const expectedActions = [{ type: EDIT_WORKOUT, payload: workout }];
    const store = mockStore();
    store.dispatch(editWorkoutAction(workout));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
