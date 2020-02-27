import axiosWithAuth from '../utils/axiosWithAuth';
import { Dispatch, Action } from 'redux';
import { WorkoutReducer } from 'src/types/State';
import { Moment } from 'moment';
import { History } from 'history';
import endpoint from '../utils/endpoint';
import { ReduxAction } from 'src/types/Types';

export const OPEN_TAG_MODAL = 'OPEN_TAG_MODAL';
export const CLOSE_TAG_MODAL = 'CLOSE_TAG_MODAL';
export const SET_ACTIVE = 'SET_ACTIVE';
export const SET_TEMPLATE_SAVE = 'SET_TEMPLATE_SAVE';
export const SET_CONFIRM_DELETE = 'SET_CONFIRM_DELETE';
export const SET_SAVE_MSG = 'SET_SAVE_MSG';
export const SET_EXERCISES = 'SET_EXERCISES';

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

// save workout
// ---------------------------------
// ---------------------------------

interface ParamsHelper {
  t: string | null;
  workout: WorkoutReducer;
  closeParentModal: Function;
  time: number;
  scope: { value: string; label: string };
  history: History;
  reFetch: Function;
  date?: Moment | null;
  workoutId?: string | null;
}

type TSaveWorkout = (
  paramsHelper: ParamsHelper
) => (dispatch: Dispatch<Action>) => Promise<void>;

export const saveWorkoutAction: TSaveWorkout = paramsHelper => {
  const {
    t,
    workout,
    closeParentModal,
    time,
    scope,
    history,
    reFetch,
    date
  } = paramsHelper;

  return async (dispatch): Promise<void> => {
    try {
      await axiosWithAuth(t).post(endpoint('workouts'), {
        date: date?.format('MMM DD YYYY'),
        title: workout.title,
        notes: workout.notes,
        exercises: workout.exercises,
        tags: workout.tags
      });
      // CODE SMELL
      await reFetch(time, history, scope.value, t);
      // need to look into removing this 'refetch' and simply adding the tag locally after the axios call
      // this is very hacky how I'm manually triggering a server call to 're-fetch' the data
      // will clean up this code, create a cleaner transition into a new state (since I'm not relying on asynchronous side effects to usher in fresh state), and reduce BE hits
      // CODE SMELL

      // // close modal and return to dashboard
      closeParentModal();
    } catch (err) {
      dispatch({
        type: SET_SAVE_MSG,
        payload: { error: err.response.data.error }
      });
    }
  };
};

// edit workout
// ---------------------------------
// ---------------------------------

export const editWorkoutAction: TSaveWorkout = paramsHelper => {
  const {
    t,
    workout,
    closeParentModal,
    time,
    scope,
    history,
    reFetch,
    workoutId
  } = paramsHelper;

  return async (dispatch): Promise<void> => {
    try {
      await axiosWithAuth(t).put(endpoint(`workouts/${workoutId}`), {
        title: workout.title,
        notes: workout.notes,
        exercises: workout.exercises,
        tags: workout.tags
      });
      // CODE SMELL
      await reFetch(time, history, scope.value, t);
      // need to look into removing this 'refetch' and simply adding the tag locally after the axios call
      // this is very hacky how I'm manually triggering a server call to 're-fetch' the data
      // will clean up this code, create a cleaner transition into a new state (since I'm not relying on asynchronous side effects to usher in fresh state), and reduce BE hits
      // CODE SMELL

      // close modal and return to dashboard
      closeParentModal();
    } catch (err) {
      dispatch<{ type: string; payload: { error: string } }>({
        type: SET_SAVE_MSG,
        payload: { error: err.response.data.error }
      });
    }
  };
};
