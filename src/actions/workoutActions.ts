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
  HANDLE_EDIT,
  UPDATE_TAG,
  DELETE_TAG,
  CLOSE_MODAL,
  OPEN_MODAL
} from '../constants/index';
import { ReduxAction } from 'src/types/Types';
import { Action } from 'redux';
import { Workout } from 'src/types/Workout';

/*== Workout actions =====================================================

These actions cover every piece of functionality within the workout modal.

Actions:
  add an exercise to the current workout
  edit an exercise within the current workout
  delete an exercise from the current workout
  add some notes to the current workout
  clear the notes on the current workout
  add a title to the current workout
  generate a workout from a template
  add/remove a tag on the current workout
  close a workout modal (reset all properties)
  injects the modal with the selected workout

*/

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

// update a tag on the current workout
export const updateTagAction = (
  tag: TagOnWorkout
): ReduxAction<TagOnWorkout> => {
  return { type: UPDATE_TAG, payload: tag };
};

// delete a tag on the current workout and all wor
export const deleteTagAction = (
  tag: TagOnWorkout
): ReduxAction<TagOnWorkout> => {
  return { type: DELETE_TAG, payload: tag };
};

// close workout modal
export const closeWorkoutModalAction = (): Action => {
  return { type: CLOSE_MODAL };
};

// open the workout modal
export const openWorkoutModalAction = (
  workout: Partial<Workout>
): ReduxAction<Partial<Workout>> => {
  return { type: OPEN_MODAL, payload: workout };
};
