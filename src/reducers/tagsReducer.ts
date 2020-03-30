import {
  UPDATE_TAG,
  DELETE_TAG,
  ADD_TAGS,
  CREATE_TAG,
  CLOSE_WORKOUT_MODAL
} from 'src/constants/index';
import { TagsReducer } from 'src/types/State';
import { AnyAction } from 'redux';
import produce from 'immer';
import { remove } from 'lodash';

const tagsState: TagsReducer = {
  tags: []
};

// for tags modal

export const tagsReducer = (
  state = tagsState,
  action: AnyAction
): TagsReducer => {
  return produce(state, draft => {
    switch (action.type) {
      case ADD_TAGS:
        draft.tags = action.payload;
        return;
      case CREATE_TAG:
        draft.tags.push(action.payload);
        return;
      case DELETE_TAG:
        remove(draft.tags, tag => tag._id === action.payload._id);
        return;
      case CLOSE_WORKOUT_MODAL:
        draft.tags = [];
        return;
      case UPDATE_TAG:
        draft.tags.forEach((tag, i) => {
          if (tag._id === action.payload._id) {
            draft.tags[i] = action.payload;
          }
        });
        return;
      default:
        return draft;
    }
  });
};
