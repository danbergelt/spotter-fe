import { optionsReducer } from '../../../reducers/optionsReducer';
import {
  OPEN_TAG_MODAL,
  CLOSE_TAG_MODAL,
  DELETE_TEMPLATE,
  SET_SAVE_MSG,
  SET_TEMPLATES_ERR,
  SET_TEMPLATES,
  SET_CONFIRM_DELETE,
  SET_FROM_TEMPLATE,
  SET_TEMPLATE_SAVE,
  SET_ACTIVE,
  SET_EXERCISES
} from '../../../actions/optionsActions';

const state = {
  active: 0,
  confirmDelete: false,
  exercises: false,
  saveMsg: {},
  tagModal: false
};

describe('options reducer', () => {
  test('should return initial state', () => {
    expect(optionsReducer(undefined, {})).toEqual(state);
  });

  test('should handle OPEN_TAG_MODAL', () => {
    expect(
      optionsReducer(undefined, {
        type: OPEN_TAG_MODAL
      })
    ).toEqual({ ...state, tagModal: true });
  });

  test('should handle CLOSE_TAG_MODAL', () => {
    expect(
      optionsReducer(
        { ...state, active: 3 },
        {
          type: CLOSE_TAG_MODAL
        }
      )
    ).toEqual({ ...state, tagModal: false, active: 0 });
  });

  test('should handle SET_SAVE_MSG', () => {
    expect(
      optionsReducer(state, {
        type: SET_SAVE_MSG,
        payload: { msg: 'msg' }
      })
    ).toEqual({ ...state, saveMsg: { msg: 'msg' } });
  });

  test('should handle SET_CONFIRM_DELETE', () => {
    expect(
      optionsReducer(state, {
        type: SET_CONFIRM_DELETE,
        payload: true
      })
    ).toEqual({ ...state, confirmDelete: true });
  });

  test('should handle SET_ACTIVE', () => {
    expect(
      optionsReducer(state, {
        type: SET_ACTIVE,
        payload: 2
      })
    ).toEqual({ ...state, active: 2 });
  });

  test('should handle SET_EXERCISES', () => {
    expect(
      optionsReducer(state, {
        type: SET_EXERCISES,
        payload: false
      })
    ).toEqual({ ...state, exercises: false });
  });
});
