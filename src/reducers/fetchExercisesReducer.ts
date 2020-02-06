import {
  FETCH_EXERCISES_ERROR,
  FETCH_EXERCISES_SUCCESS,
  CREATE_EXERCISE,
  DELETE_SAVED_EXERCISE
} from '../actions/fetchExercisesActions';
import { FetchExercisesReducer } from 'src/types/State';
import { AnyAction } from 'redux';

const fetchExercisesState: FetchExercisesReducer = {
  err: null,
  savedExercises: []
};

// controls saved exercises

export const fetchExercisesReducer = (
  state = fetchExercisesState,
  action: AnyAction
): FetchExercisesReducer => {
  switch (action.type) {
    case FETCH_EXERCISES_SUCCESS:
      return {
        ...state,
        err: null,
        savedExercises: action.payload
      };
    case FETCH_EXERCISES_ERROR:
      return {
        ...state,
        err: action.payload
      };
    case CREATE_EXERCISE:
      return {
        ...state,
        savedExercises: [...state.savedExercises, action.payload]
      };
    case DELETE_SAVED_EXERCISE:
      return {
        ...state,
        savedExercises: state.savedExercises.filter(
          el => el._id !== action.payload
        )
      };
    default:
      return state;
  }
};
