import { ReduxAction } from 'src/types/Types';
import { Workout } from 'src/types/Workout';

export const OPEN_TAG_MODAL = 'OPEN_TAG_MODAL';
export const CLOSE_TAG_MODAL = 'CLOSE_TAG_MODAL';
export const SET_ACTIVE = 'SET_ACTIVE';
export const SET_TEMPLATE_SAVE = 'SET_TEMPLATE_SAVE';
export const SET_CONFIRM_DELETE = 'SET_CONFIRM_DELETE';
export const SET_SAVE_MSG = 'SET_SAVE_MSG';
export const SET_EXERCISES = 'SET_EXERCISES';

export const CREATE_WORKOUT = 'CREATE_WORKOUT';
export const EDIT_WORKOUT = 'EDIT_WORKOUT';

// all actions related to the various options/settings in the workout modal, e.g. template settings, tag settings, etc.

// sets the state of the confirm delete modal (open or closed)
type TSetConfirmDelete = (state: boolean) => ReduxAction<boolean>;
export const setConfirmDeleteAction: TSetConfirmDelete = state => {
  return { type: SET_CONFIRM_DELETE, payload: state };
};

// sets the state of the exercise modal (open or closed)
export const setExercisesModalAction = (
  state: boolean
): ReduxAction<boolean> => {
  return { type: SET_EXERCISES, payload: state };
};

// create a workout
export const createWorkoutAction = (workout: Workout): ReduxAction<Workout> => {
  return { type: CREATE_WORKOUT, payload: workout };
};

// edit a workout
export const editWorkoutAction = (workout: Workout): ReduxAction<Workout> => {
  return { type: EDIT_WORKOUT, payload: workout };
};
