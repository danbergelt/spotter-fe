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
type TAddExercise = (values: Exercise) => { type: string; payload: Exercise };
export const addExerciseAction: TAddExercise = values => {
  return { type: ADD_EXERCISE, payload: values };
};

// if an exercise is queued to be edited, submits those edits and update the exercise
export const editExerciseAction = (
  exercise: Exercise,
  i: number
): ReduxAction<{ exercise: Exercise; i: number }> => {
  return { type: HANDLE_EDIT, payload: { exercise, i } };
};

// deletes an exercise from the current workout
type TDelExercise = (i: number) => { type: string; payload: number };
export const delExerciseAction: TDelExercise = i => {
  return { type: DEL_EXERCISE, payload: i };
};

// add workout notes
type TAddNotes = (value: string) => { type: string; payload: string };
export const addNotesAction: TAddNotes = value => {
  return { type: ADD_WORKOUT_NOTES, payload: value };
};

// reset workout notes
// clears the notes section of all text
type TResetNotes = (emptyStr: string) => { type: string; payload: string };
export const resetNotesAction: TResetNotes = emptyStr => {
  return { type: RESET_NOTES, payload: emptyStr };
};

// add workout title
type TAddTitle = (value: string) => { type: string; payload: string };
export const addTitleAction: TAddTitle = value => {
  return { type: ADD_WORKOUT_TITLE, payload: value };
};

// generates a workout from a saved template
// will read the content of the template and assign the pieces of data to their proper homes in the redux store
type TGenerateTemplate = (
  template: Template | {}
) => { type: string; payload: Template | {} };
export const generateTemplateAction: TGenerateTemplate = template => {
  return { type: FROM_TEMPLATE, payload: template };
};

// toggle tag on current workout (add / remove)
type TToggleTag = (
  tag: TagOnWorkout
) => { type: string; payload: TagOnWorkout };
export const toggleTagAction: TToggleTag = tag => {
  return { type: TOGGLE_TAG, payload: tag };
};
