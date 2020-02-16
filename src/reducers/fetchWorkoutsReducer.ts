import {
  FETCH_WORKOUTS_START,
  FETCH_WORKOUTS_SUCCESS,
  FETCH_WORKOUTS_ERROR,
  DELETE_WORKOUT
} from '../actions/fetchWorkoutsActions';
import { AnyAction } from 'redux';
import { UPDATE_TAG } from '../actions/workoutActions';
import { FetchWorkoutsReducer } from 'src/types/State';

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
  switch (action.type) {
    case FETCH_WORKOUTS_START:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_WORKOUTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        workouts: action.payload
      };
    case FETCH_WORKOUTS_ERROR:
      return {
        ...state,
        isLoading: false,
        err: action.payload
      };
    case DELETE_WORKOUT:
      return {
        ...state,
        workouts: state.workouts.filter(
          workout => workout._id !== action.payload
        )
      };
    case UPDATE_TAG:
      return {
        ...state,
        workouts: state.workouts.map(workout => {
          return {
            ...workout,
            tags: workout.tags.map(tag =>
              tag._id === action.payload._id ? action.payload : tag
            )
          };
        })
      };
    default:
      return state;
  }
};
