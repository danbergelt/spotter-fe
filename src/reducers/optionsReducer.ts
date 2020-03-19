import {
  OPEN_TAG_MODAL,
  CLOSE_TAG_MODAL,
  SET_ACTIVE,
  SET_SAVE_MSG,
  SET_EXERCISES
} from '../actions/optionsActions';
import { CLOSE_WORKOUT_MODAL } from '../actions/globalActions';
import { OptionsReducer } from 'src/types/State';
import { AnyAction } from 'redux';
import produce from 'immer';

// controls all the various options/settings in the workout modal, including the various modal states, populated content, error messages, etc.

const optionsState: OptionsReducer = {
  active: 0,
  tagModal: false,
  exercises: false,
  saveMsg: {}
};

export const optionsReducer = (
  state = optionsState,
  action: AnyAction
): OptionsReducer => {
  return produce(state, draft => {
    switch (action.type) {
      case OPEN_TAG_MODAL:
        draft.tagModal = true;
        return;
      case CLOSE_TAG_MODAL:
        draft.tagModal = false;
        draft.active = 0;
        return;
      case SET_ACTIVE:
        draft.active = action.payload;
        return;
      case SET_EXERCISES:
        draft.exercises = action.payload;
        return;
      case SET_SAVE_MSG:
        draft.saveMsg = action.payload;
        return;
      case CLOSE_WORKOUT_MODAL:
        draft.saveMsg = {};
        return;
      default:
        return draft;
    }
  });
};
