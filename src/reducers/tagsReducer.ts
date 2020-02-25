import {
  FETCH_TAGS_START,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_ERROR,
  RESET_TAGS
} from '../actions/tagsActions';
import { CLOSE_WORKOUT_MODAL } from '../actions/globalActions';
import { TagsReducer } from 'src/types/State';
import { AnyAction } from 'redux';
import produce from 'immer';

const tagsState: TagsReducer = {
  isLoading: false,
  err: null,
  tags: []
};

// for tags modal

export const tagsReducer = (
  state = tagsState,
  action: AnyAction
): TagsReducer => {
  return produce(state, draft => {
    switch (action.type) {
      case FETCH_TAGS_START:
        draft.isLoading = true;
        return;
      case FETCH_TAGS_SUCCESS:
        draft.isLoading = false;
        draft.tags = action.payload;
        return;
      case FETCH_TAGS_ERROR:
        draft.isLoading = false;
        draft.err = action.payload;
        return;
      case RESET_TAGS:
        draft.tags = [];
        return;
      case CLOSE_WORKOUT_MODAL:
        draft.tags = [];
        return;
      default:
        return draft;
    }
  });
};
