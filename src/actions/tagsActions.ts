import { ReduxAction } from '../types/Types';
import {
  SET_ACTIVE,
  CLOSE_TAG_MODAL,
  OPEN_TAG_MODAL,
  ADD_TAGS,
  CREATE_TAG,
  DELETE_TAG,
  UPDATE_TAG
} from '../constants/index';
import { TagOnWorkout } from 'src/types/TagOnWorkout';

// fetch tags
export const fetchTagsAction = (
  tags: Array<TagOnWorkout>
): ReduxAction<Array<TagOnWorkout>> => {
  return { type: ADD_TAGS, payload: tags };
};

// create a tag
export const createTagAction = (
  tag: TagOnWorkout
): ReduxAction<TagOnWorkout> => {
  return { type: CREATE_TAG, payload: tag };
};

// set active tags modal tab
export const setActiveTabAction = (id: number): ReduxAction<number> => {
  return { type: SET_ACTIVE, payload: id };
};

// delete tag
export const deleteTagAction = (
  tag: TagOnWorkout
): ReduxAction<TagOnWorkout> => {
  return { type: DELETE_TAG, payload: tag };
};

export const editTagAction = (tag: string): ReduxAction<string> => {
  return { type: UPDATE_TAG, payload: tag };
};

// close tag modal
export const closeTagModalAction = (): { type: string } => {
  return { type: CLOSE_TAG_MODAL };
};

// open tag modal
export const openTagModalAction = (): { type: string } => {
  return { type: OPEN_TAG_MODAL };
};
