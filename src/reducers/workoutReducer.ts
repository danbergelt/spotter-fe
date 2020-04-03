import {
  ADD_WORKOUT_TITLE,
  RESET_NOTES,
  ADD_WORKOUT_NOTES,
  ADD_EXERCISE,
  TOGGLE_TAG,
  UPDATE_TAG,
  DELETE_TAG,
  FROM_TEMPLATE,
  DEL_EXERCISE,
  HANDLE_EDIT,
  CLOSE_MODAL,
  OPEN_MODAL
} from '../constants/index';
import { WorkoutReducer } from 'src/types';
import { AnyAction } from 'redux';
import produce from 'immer';
import helpers from 'src/utils/stateHelpers';

const { exists, replaceOne, replaceAll, remove } = helpers;

const workoutState: WorkoutReducer = {
  title: '',
  notes: '',
  exercises: [],
  tags: [],
  date: '',
  _id: null
};

export const workoutReducer = (
  state = workoutState,
  action: AnyAction
): WorkoutReducer => {
  return produce(state, draft => {
    switch (action.type) {
      case OPEN_MODAL:
        replaceAll(draft, action.payload);
        return draft;
      case ADD_WORKOUT_TITLE:
        draft.title = action.payload;
        return draft;
      case ADD_WORKOUT_NOTES:
        draft.notes = action.payload;
        return draft;
      case RESET_NOTES:
        draft.notes = '';
        return draft;
      case ADD_EXERCISE:
        draft.exercises.push(action.payload);
        return draft;
      case TOGGLE_TAG:
        if (exists(draft.tags, action.payload._id)) {
          remove(draft.tags, action.payload._id);
        } else {
          draft.tags.push(action.payload);
        }
        return draft;
      case DELETE_TAG:
        remove(draft.tags, action.payload._id);
        return draft;
      case UPDATE_TAG:
        if (exists(draft.tags, action.payload._id)) {
          replaceOne(draft.tags, action.payload);
        }
        return draft;
      case FROM_TEMPLATE:
        replaceAll(draft, action.payload);
        return draft;
      case DEL_EXERCISE:
        draft.exercises.splice(action.payload, 1);
        return draft;
      case HANDLE_EDIT:
        draft.exercises[action.payload.i] = action.payload.exercise;
        return draft;
      case CLOSE_MODAL:
        return workoutState;
      default:
        return draft;
    }
  });
};
