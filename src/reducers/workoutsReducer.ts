import {
  DELETE_WORKOUT,
  FETCH_WORKOUTS,
  UPDATE_TAG,
  DELETE_TAG,
  CREATE_WORKOUT,
  EDIT_WORKOUT
} from '../constants/index';
import { AnyAction } from 'redux';
import { WorkoutsReducer } from 'src/types/State';
import produce from 'immer';
import helpers from 'src/utils/stateHelpers';

const { replaceOne, remove } = helpers;

const workoutsState: WorkoutsReducer = {
  workouts: []
};

export const workoutsReducer = (
  state = workoutsState,
  action: AnyAction
): WorkoutsReducer => {
  return produce(state, draft => {
    switch (action.type) {
      case CREATE_WORKOUT:
        draft.workouts.push(action.payload);
        return draft;
      case EDIT_WORKOUT:
        replaceOne(draft.workouts, action.payload);
        return draft;
      case FETCH_WORKOUTS:
        draft.workouts = action.payload;
        return draft;
      case DELETE_WORKOUT:
        remove(draft.workouts, action.payload);
        return draft;
      case UPDATE_TAG:
        draft.workouts.forEach(workout =>
          replaceOne(workout.tags, action.payload)
        );
        return draft;
      case DELETE_TAG:
        draft.workouts.forEach(workout =>
          remove(workout.tags, action.payload._id)
        );
        return draft;
      default:
        return draft;
    }
  });
};
