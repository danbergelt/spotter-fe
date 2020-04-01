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
import { WorkoutReducer } from 'src/types/State';
import { AnyAction } from 'redux';
import produce from 'immer';
import helpers from 'src/utils/stateHelpers';

const { exists, replaceOne, replaceAll, remove } = helpers;

const workoutState: WorkoutReducer = {
  title: '',
  notes: '',
  exercises: [],
  tags: [],
  _id: null
};

export const workoutReducer = (
  state = workoutState,
  action: AnyAction
): WorkoutReducer => {
  return produce(state, draft => {
    switch (action.type) {
      case OPEN_MODAL:
        if (action.payload.workout) {
          replaceAll(draft, action.payload.workout);
        }
        return;
      case ADD_WORKOUT_TITLE:
        draft.title = action.payload;
        return;
      case ADD_WORKOUT_NOTES:
        draft.notes = action.payload;
        return;
      case RESET_NOTES:
        draft.notes = '';
        return;
      case ADD_EXERCISE:
        draft.exercises.push(action.payload);
        return;
      case TOGGLE_TAG:
        if (exists(draft.tags, action.payload._id)) {
          remove(draft.tags, action.payload._id);
        } else {
          draft.tags.push(action.payload);
        }
        return;
      case DELETE_TAG:
        remove(draft.tags, action.payload._id);
        return;
      case UPDATE_TAG:
        if (exists(draft.tags, action.payload._id)) {
          replaceOne(draft.tags, action.payload);
        }
        return;
      case FROM_TEMPLATE:
        replaceAll(draft, action.payload);
        return;
      case DEL_EXERCISE:
        draft.exercises.splice(action.payload, 1);
        return;
      case HANDLE_EDIT:
        draft.exercises[action.payload.i] = action.payload.exercise;
        return;
      case CLOSE_MODAL:
        replaceAll(draft, workoutState);
        return;
      default:
        return draft;
    }
  });
};
