import {
  FETCH_WORKOUTS_START,
  FETCH_WORKOUTS_SUCCESS,
  FETCH_WORKOUTS_ERROR,
  DELETE_WORKOUT
} from '../actions/fetchWorkoutsActions';
import { AnyAction } from 'redux';
import { UPDATE_TAG, DELETE_TAG } from '../actions/workoutActions';
import { FetchWorkoutsReducer } from 'src/types/State';
import produce from 'immer';
import { remove } from 'lodash';
import { CREATE_WORKOUT, EDIT_WORKOUT } from 'src/actions/optionsActions';

const fetchedWorkoutsState: FetchWorkoutsReducer = {
  err: null,
  isLoading: false,
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
      case FETCH_WORKOUTS_START:
        draft.isLoading = true;
        return;
      case FETCH_WORKOUTS_SUCCESS:
        draft.isLoading = false;
        draft.workouts = action.payload;
        return;
      case FETCH_WORKOUTS_ERROR:
        draft.isLoading = false;
        draft.err = action.payload;
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
