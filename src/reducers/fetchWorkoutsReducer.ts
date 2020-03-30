import {
  DELETE_WORKOUT,
  FETCH_WORKOUTS,
  UPDATE_TAG,
  DELETE_TAG,
  CREATE_WORKOUT,
  EDIT_WORKOUT
} from '../constants/index';
import { AnyAction } from 'redux';
import { FetchWorkoutsReducer } from 'src/types/State';
import produce from 'immer';
import { remove } from 'lodash';

const fetchedWorkoutsState: FetchWorkoutsReducer = {
  workouts: []
};

// populates dashboard

export const fetchWorkoutsReducer = (
  state = fetchedWorkoutsState,
  action: AnyAction
): FetchWorkoutsReducer => {
  return produce(state, draft => {
    switch (action.type) {
      case CREATE_WORKOUT:
        draft.workouts.push(action.payload);
        return;
      case EDIT_WORKOUT:
        draft.workouts.forEach((workout, i) => {
          if (workout._id === action.payload._id) {
            draft.workouts[i] = action.payload;
          }
        });
        return;
      case FETCH_WORKOUTS:
        draft.workouts = action.payload;
        return;
      case DELETE_WORKOUT:
        remove(draft.workouts, el => el._id === action.payload);
        return;
      case UPDATE_TAG:
        draft.workouts.forEach((workout, i) =>
          workout.tags.forEach(
            (tag, j) =>
              tag._id === action.payload._id &&
              (draft.workouts[i].tags[j] = action.payload)
          )
        );
        return;
      case DELETE_TAG:
        draft.workouts.forEach(workout =>
          remove(workout.tags, tag => tag._id === action.payload._id)
        );
        return;
      default:
        return draft;
    }
  });
};
