import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import {
  setExercisesModalAction,
  createWorkoutAction,
  editWorkoutAction
} from 'src/actions/optionsActions';
import {
  SET_EXERCISES,
  CREATE_WORKOUT,
  EDIT_WORKOUT
} from '../../../constants/index';

const mockStore = configureMockStore();

describe('dispatches option actions', () => {
  test('create workout', () => {
    const expectedActions = [{ type: CREATE_WORKOUT, payload: 'foo' }];

    const store = mockStore();

    store.dispatch(createWorkoutAction('foo'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('edit workout', () => {
    const expectedActions = [{ type: EDIT_WORKOUT, payload: 'foo' }];

    const store = mockStore();

    store.dispatch(editWorkoutAction('foo'));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
