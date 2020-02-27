import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import {
  SET_CONFIRM_DELETE,
  setConfirmDeleteAction,
  SET_EXERCISES,
  setExercisesModalAction,
  CREATE_WORKOUT,
  createWorkoutAction,
  EDIT_WORKOUT,
  editWorkoutAction
} from '../../../actions/optionsActions';

const mockStore = configureMockStore([thunk]);

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

  test('set confirm delete modal state', () => {
    const expectedActions = [{ type: SET_CONFIRM_DELETE, payload: false }];

    const store = mockStore();

    store.dispatch(setConfirmDeleteAction(false));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set exercises modal state', () => {
    const expectedActions = [{ type: SET_EXERCISES, payload: true }];

    const store = mockStore();

    store.dispatch(setExercisesModalAction(true));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
