import { ReduxAction } from 'src/types/Types';
import { Workout } from 'src/types/Workout';
import { CREATE_WORKOUT, EDIT_WORKOUT } from 'src/constants';

// all actions related to the various options/settings in the workout modal, e.g. template settings, tag settings, etc.

// create a workout
export const createWorkoutAction = (workout: Workout): ReduxAction<Workout> => {
  return { type: CREATE_WORKOUT, payload: workout };
};

// edit a workout
export const editWorkoutAction = (workout: Workout): ReduxAction<Workout> => {
  return { type: EDIT_WORKOUT, payload: workout };
};
