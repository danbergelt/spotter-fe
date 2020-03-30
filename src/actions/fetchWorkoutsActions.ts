import { ReduxAction } from 'src/types/Types';
import { Workout } from 'src/types/Workout';
import { FETCH_WORKOUTS, DELETE_WORKOUT } from 'src/constants';

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
