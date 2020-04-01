import configureMockStore from 'redux-mock-store';
import {
  ADD_EXERCISE,
  UPDATE_TAG,
  HANDLE_EDIT,
  DEL_EXERCISE,
  ADD_WORKOUT_NOTES,
  RESET_NOTES,
  ADD_WORKOUT_TITLE,
  FROM_TEMPLATE,
  TOGGLE_TAG,
  DELETE_TAG
} from 'src/constants/index';
import {
  addExerciseAction,
  editExerciseAction,
  delExerciseAction,
  addNotesAction,
  resetNotesAction,
  addTitleAction,
  generateTemplateAction,
  toggleTagAction,
  updateTagAction,
  deleteTagAction
} from '../../../actions/workoutActions';
import { workout } from 'src/__testUtils__/workout';
import { tag } from 'src/__testUtils__/tag';
import { t1 } from 'src/__testUtils__/template';

const mockStore = configureMockStore();

const exercise = workout.exercises[0];

describe('dispatches workout actions', () => {
  test('add exercise', () => {
    const expectedActions = [{ type: ADD_EXERCISE, payload: exercise }];
    const store = mockStore();
    store.dispatch(addExerciseAction(exercise));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('edit exercise', () => {
    const expectedActions = [
      { type: HANDLE_EDIT, payload: { exercise, i: 0 } }
    ];
    const store = mockStore();
    store.dispatch(editExerciseAction(exercise, 0));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('handles del exercise', () => {
    const expectedActions = [{ type: DEL_EXERCISE, payload: 1 }];
    const store = mockStore();
    store.dispatch(delExerciseAction(1));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('handles add notes', () => {
    const expectedActions = [{ type: ADD_WORKOUT_NOTES, payload: 'e' }];
    const store = mockStore();
    store.dispatch(addNotesAction('e'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('handles reset notes', () => {
    const expectedActions = [{ type: RESET_NOTES, payload: '' }];
    const store = mockStore();
    store.dispatch(resetNotesAction(''));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('add workout title', () => {
    const expectedActions = [{ type: ADD_WORKOUT_TITLE, payload: 't' }];
    const store = mockStore();
    store.dispatch(addTitleAction('t'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('generate template', () => {
    const expectedActions = [{ type: FROM_TEMPLATE, payload: t1 }];
    const store = mockStore();
    store.dispatch(generateTemplateAction(t1));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('toggle tag', () => {
    const expectedActions = [{ type: TOGGLE_TAG, payload: tag }];
    const store = mockStore();
    store.dispatch(toggleTagAction(tag));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('update tag', () => {
    const expectedActions = [{ type: UPDATE_TAG, payload: tag }];
    const store = mockStore();
    store.dispatch(updateTagAction(tag));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('delete tag', () => {
    const expectedActions = [{ type: DELETE_TAG, payload: tag }];
    const store = mockStore();
    store.dispatch(deleteTagAction(tag));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
