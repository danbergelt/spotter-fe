import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import {
  SET_EXERCISES,
  setExercisesModalAction,
  CREATE_WORKOUT,
  createWorkoutAction,
  EDIT_WORKOUT,
  editWorkoutAction
} from '../../../actions/optionsActions';

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
