import {
  FETCH_EXERCISES_ERROR,
  FETCH_EXERCISES_SUCCESS,
  CREATE_EXERCISE,
  DELETE_SAVED_EXERCISE
} from '../actions/fetchExercisesActions';
import { FetchExercisesReducer } from 'src/types/State';
import { AnyAction } from 'redux';
import produce from 'immer';
import { remove } from 'lodash';

const fetchExercisesState: FetchExercisesReducer = {
  err: null,
  savedExercises: []
};

// controls saved exercises

export const fetchExercisesReducer = (
  state = fetchExercisesState,
  action: AnyAction
): FetchExercisesReducer => {
  // using immer --> create a deep clone of state, perform mutable operations on that clone
  return produce(state, draft => {
    switch (action.type) {
      case FETCH_EXERCISES_SUCCESS:
        draft.err = null;
        draft.savedExercises = action.payload;
        return;
      case FETCH_EXERCISES_ERROR:
        draft.err = action.payload;
        return;
      case CREATE_EXERCISE:
        draft.savedExercises.push(action.payload);
        return;
      case DELETE_SAVED_EXERCISE:
        remove(draft.savedExercises, el => el._id === action.payload);
        return;
      default:
        return draft;
    }
  });
};
