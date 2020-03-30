import { ReduxAction } from 'src/types/Types';
import { Workout } from 'src/types/Workout';
import {
  FETCH_WORKOUTS,
  DELETE_WORKOUT,
  CREATE_WORKOUT,
  EDIT_WORKOUT
} from 'src/constants';

/*== workouts actions =====================================================

These actions handle interacting with workouts fetched from the server. 
This includes:
  fetching workouts for a specific range and displaying on dashboard
  editing a pre-existing workout
  deleting a workout
  creating a new workout

*/

// fetch workouts by range (month or week)
export const fetchWorkoutsAction = (
  workouts: Workout[]
): ReduxAction<Workout[]> => {
  return { type: FETCH_WORKOUTS, payload: workouts };
};

// delete workout
export const deleteWorkoutAction = (id: string): ReduxAction<string> => {
  return { type: DELETE_WORKOUT, payload: id };
};

// create a workout
export const createWorkoutAction = (workout: Workout): ReduxAction<Workout> => {
  return { type: CREATE_WORKOUT, payload: workout };
};

// edit a workout
export const editWorkoutAction = (workout: Workout): ReduxAction<Workout> => {
  return { type: EDIT_WORKOUT, payload: workout };
};
