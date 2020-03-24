import { ReduxAction } from '../types/Types';
import { DELETE_TAG, UPDATE_TAG } from './workoutActions';
import { SET_ACTIVE, CLOSE_TAG_MODAL, OPEN_TAG_MODAL } from './optionsActions';
import { TagOnWorkout } from 'src/types/TagOnWorkout';

export const ADD_TAGS = 'ADD_TAGS';
export const CREATE_TAG = 'CREATE_TAG';

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
