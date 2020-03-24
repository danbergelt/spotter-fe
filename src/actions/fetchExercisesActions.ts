import { Exercise } from 'src/types/ExerciseOption';
import { ReduxAction } from 'src/types/Types';

export const FETCH_EXERCISES = 'FETCH_EXERCISES';
export const CREATE_EXERCISE = 'CREATE_EXERCISE';
export const DELETE_SAVED_EXERCISE = 'DELETE_SAVED_EXERCISE';

// fetches saved exercises
export const fetchExercisesAction = (
  exercises: Array<Exercise>
): ReduxAction<Array<Exercise>> => {
  return { type: FETCH_EXERCISES, payload: exercises };
};

// delete an exercise
export const deleteExerciseAction = (id: string): ReduxAction<string> => {
  return { type: DELETE_SAVED_EXERCISE, payload: id };
};

// create a new exercise
export const createExerciseAction = (
  exercise: Exercise
): ReduxAction<Exercise> => {
  return { type: CREATE_EXERCISE, payload: exercise };
};
