import {
  FETCH_EXERCISES,
  CREATE_EXERCISE,
  DELETE_SAVED_EXERCISE
} from '../constants/index';
import { FetchExercisesReducer } from 'src/types/State';
import { AnyAction } from 'redux';
import produce from 'immer';
import { remove } from 'lodash';

const fetchExercisesState: FetchExercisesReducer = {
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
      case FETCH_EXERCISES:
        draft.savedExercises = action.payload;
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
