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
  fromTemplate: false,
  exercises: false,
  saveMsg: {},
  tagModal: false,
  templateSave: false,
  templates: [],
  templatesErr: ''
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

  test('should handle DELETE_TEMPLATE', () => {
    expect(
      optionsReducer(
        { ...state, templates: [{ _id: 1 }] },
        { type: DELETE_TEMPLATE, payload: 1 }
      )
    ).toEqual(state);
  });

  test('should handle SET_SAVE_MSG', () => {
    expect(
      optionsReducer(state, {
        type: SET_SAVE_MSG,
        payload: { msg: 'msg' }
      })
    ).toEqual({ ...state, saveMsg: { msg: 'msg' } });
  });

  test('should handle SET_TEMPLATES_ERR', () => {
    expect(
      optionsReducer(state, {
        type: SET_TEMPLATES_ERR,
        payload: 'err'
      })
    ).toEqual({ ...state, templatesErr: 'err' });
  });

  test('should handle SET_TEMPLATES', () => {
    expect(
      optionsReducer(state, {
        type: SET_TEMPLATES,
        payload: [{ template: 'template' }]
      })
    ).toEqual({ ...state, templates: [{ template: 'template' }] });
  });

  test('should handle SET_CONFIRM_DELETE', () => {
    expect(
      optionsReducer(state, {
        type: SET_CONFIRM_DELETE,
        payload: true
      })
    ).toEqual({ ...state, confirmDelete: true });
  });

  test('should handle SET_FROM_TEMPLATE', () => {
    expect(
      optionsReducer(state, {
        type: SET_FROM_TEMPLATE,
        payload: true
      })
    ).toEqual({ ...state, fromTemplate: true });
  });

  test('should handle SET_TEMPLATE_SAVE', () => {
    expect(
      optionsReducer(state, {
        type: SET_TEMPLATE_SAVE,
        payload: true
      })
    ).toEqual({ ...state, templateSave: true });
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
