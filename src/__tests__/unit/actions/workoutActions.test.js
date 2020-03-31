import configureMockStore from 'redux-mock-store';
import {
  ADD_EXERCISE,
  HANDLE_EDIT,
  DEL_EXERCISE,
  ADD_WORKOUT_NOTES,
  RESET_NOTES,
  ADD_WORKOUT_TITLE,
  FROM_TEMPLATE,
  TOGGLE_TAG
} from 'src/constants/index';
import {
  addExerciseAction,
  editExerciseAction,
  delExerciseAction,
  addNotesAction,
  resetNotesAction,
  addTitleAction,
  generateTemplateAction,
  toggleTagAction
} from '../../../actions/workoutActions';

const mockStore = configureMockStore();

describe('dispatches workout actions', () => {
  test('add exercise', () => {
    const expectedActions = [{ type: ADD_EXERCISE, payload: 'foo' }];

    const store = mockStore();

    store.dispatch(addExerciseAction('foo'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('edit exercise', () => {
    const expectedActions = [
      { type: HANDLE_EDIT, payload: { exercise: 'foo', i: 'bar' } }
    ];

    const store = mockStore();

    store.dispatch(editExerciseAction('foo', 'bar'));

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
    const expectedActions = [{ type: FROM_TEMPLATE, payload: 'foo' }];

    const store = mockStore();

    store.dispatch(generateTemplateAction('foo'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('toggle tag', () => {
    const expectedActions = [{ type: TOGGLE_TAG, payload: 'foo' }];

    const store = mockStore();

    store.dispatch(toggleTagAction('foo'));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
