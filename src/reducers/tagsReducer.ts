import {
  FETCH_TAGS_START,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_ERROR,
  RESET_TAGS
} from '../actions/tagsActions';
import { CLOSE_WORKOUT_MODAL } from '../actions/globalActions';
import { TagsReducer } from 'src/types/State';
import { AnyAction } from 'redux';

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
  switch (action.type) {
    case FETCH_TAGS_START:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_TAGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tags: action.payload
      };
    case FETCH_TAGS_ERROR:
      return {
        ...state,
        isLoading: false,
        err: action.payload
      };
    case RESET_TAGS:
      return {
        ...state,
        tags: []
      };
    case CLOSE_WORKOUT_MODAL:
      return {
        ...state,
        tags: []
      };
    default:
      return state;
  }
};
