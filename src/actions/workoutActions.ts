import { Exercise } from 'src/types/Exercises';
import { Template } from 'src/types/Template';
import { TagOnWorkout } from 'src/types/TagOnWorkout';
import {
  ADD_WORKOUT_TITLE,
  ADD_WORKOUT_NOTES,
  RESET_NOTES,
  ADD_EXERCISE,
  TOGGLE_TAG,
  FROM_TEMPLATE,
  DEL_EXERCISE,
  HANDLE_EDIT
} from '../constants/index';
import { ReduxAction } from 'src/types/Types';

// adds a new exercise to the current workout
export const addExerciseAction = (
  exercise: Exercise
): ReduxAction<Exercise> => {
  return { type: ADD_EXERCISE, payload: exercise };
};

// edit an exercise within the workout modal
export const editExerciseAction = (
  exercise: Exercise,
  i: number
): ReduxAction<{ exercise: Exercise; i: number }> => {
  return { type: HANDLE_EDIT, payload: { exercise, i } };
};

// deletes an exercise from the current workout
export const delExerciseAction = (i: number): ReduxAction<number> => {
  return { type: DEL_EXERCISE, payload: i };
};

// add workout notes
export const addNotesAction = (value: string): ReduxAction<string> => {
  return { type: ADD_WORKOUT_NOTES, payload: value };
};

// reset workout notes
export const resetNotesAction = (emptyStr: string): ReduxAction<string> => {
  return { type: RESET_NOTES, payload: emptyStr };
};

// add workout title
export const addTitleAction = (value: string): ReduxAction<string> => {
  return { type: ADD_WORKOUT_TITLE, payload: value };
};

// generates a workout from a saved template
export const generateTemplateAction = (
  template: Template
): ReduxAction<Template> => {
  return { type: FROM_TEMPLATE, payload: template };
};

// toggle tag on current workout (add / remove)
export const toggleTagAction = (
  tag: TagOnWorkout
): ReduxAction<TagOnWorkout> => {
  return { type: TOGGLE_TAG, payload: tag };
};
