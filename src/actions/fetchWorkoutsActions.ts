import { ReduxAction } from 'src/types/Types';
import { Workout } from 'src/types/Workout';

export const DELETE_WORKOUT = 'DELETE_WORKOUT';
export const FETCH_WORKOUTS = 'FETCH_WORKOUTS';

// fetch workouts by range (month or week)
export const fetchWorkoutsAction = (
  workouts: Array<Workout>
): ReduxAction<Array<Workout>> => {
  return { type: FETCH_WORKOUTS, payload: workouts };
};

// delete workout
export const deleteWorkoutAction = (id: string): ReduxAction<string> => {
  return { type: DELETE_WORKOUT, payload: id };
};
