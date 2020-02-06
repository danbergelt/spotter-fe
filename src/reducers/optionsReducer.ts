import {
  OPEN_TAG_MODAL,
  CLOSE_TAG_MODAL,
  SET_ACTIVE,
  SET_CONFIRM_DELETE,
  SET_FROM_TEMPLATE,
  SET_SAVE_MSG,
  SET_TEMPLATES,
  SET_TEMPLATES_ERR,
  SET_TEMPLATE_SAVE,
  DELETE_TEMPLATE,
  SET_EXERCISES
} from '../actions/optionsActions';
import { CLOSE_WORKOUT_MODAL } from '../actions/globalActions';
import { OptionsReducer } from 'src/types/State';
import { AnyAction } from 'redux';

// controls all the various options/settings in the workout modal, including the various modal states, populated content, error messages, etc.

const optionsState: OptionsReducer = {
  active: 0,
  tagModal: false,
  templateSave: false,
  fromTemplate: false,
  confirmDelete: false,
  exercises: false,
  templates: [],
  templatesErr: '',
  saveMsg: {}
};

export const optionsReducer = (
  state = optionsState,
  action: AnyAction
): OptionsReducer => {
  switch (action.type) {
    case OPEN_TAG_MODAL:
      return { ...state, tagModal: true };
    case CLOSE_TAG_MODAL:
      return { ...state, tagModal: false, active: 0 };
    case SET_ACTIVE:
      return { ...state, active: action.payload };
    case SET_TEMPLATE_SAVE:
      return { ...state, templateSave: action.payload };
    case SET_FROM_TEMPLATE:
      return { ...state, fromTemplate: action.payload };
    case SET_EXERCISES:
      return { ...state, exercises: action.payload };
    case SET_CONFIRM_DELETE:
      return { ...state, confirmDelete: action.payload };
    case SET_TEMPLATES:
      return { ...state, templates: action.payload };
    case SET_TEMPLATES_ERR:
      return { ...state, templatesErr: action.payload };
    case SET_SAVE_MSG:
      return { ...state, saveMsg: action.payload };
    case DELETE_TEMPLATE:
      return {
        ...state,
        templates: state.templates.filter(el => el._id !== action.payload)
      };
    case CLOSE_WORKOUT_MODAL:
      return {
        ...state,
        saveMsg: {}
      };
    default:
      return state;
  }
};
