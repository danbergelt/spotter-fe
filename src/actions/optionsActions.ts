import axiosWithAuth from '../utils/axiosWithAuth';
import { Dispatch, Action } from 'redux';
import { Template } from 'src/types/Template';
import { WorkoutReducer, State } from 'src/types/State';
import { Moment } from 'moment';
import { History } from 'history';
import { ThunkDispatch } from 'redux-thunk';
import { api } from '../utils/api';

export const OPEN_TAG_MODAL = 'OPEN_TAG_MODAL';
export const CLOSE_TAG_MODAL = 'CLOSE_TAG_MODAL';
export const SET_ACTIVE = 'SET_ACTIVE';
export const SET_TEMPLATE_SAVE = 'SET_TEMPLATE_SAVE';
export const SET_FROM_TEMPLATE = 'SET_FROM_TEMPLATE';
export const SET_CONFIRM_DELETE = 'SET_CONFIRM_DELETE';
export const SET_TEMPLATES = 'SET_TEMPLATES';
export const SET_TEMPLATES_ERR = 'SET_TEMPLATES_ERR';
export const SET_SAVE_MSG = 'SET_SAVE_MSG';
export const DELETE_TEMPLATE = 'DELETE_TEMPLATE';
export const SET_EXERCISES = 'SET_EXERCISES';

// all actions related to the various options/settings in the workout modal, e.g. template settings, tag settings, etc.

// sets the state of the confirm delete modal (open or closed)
type TSetConfirmDelete = (state: boolean) => { type: string; payload: boolean };
export const setConfirmDeleteAction: TSetConfirmDelete = state => {
  return { type: SET_CONFIRM_DELETE, payload: state };
};

// sets the state of the exercise modal (open or closed)
type TSetExercisesModal = (
  state: boolean
) => { type: string; payload: boolean };
export const setExercisesModalAction: TSetExercisesModal = state => {
  return { type: SET_EXERCISES, payload: state };
};

// sets the state of the from template modal (open or closed)
type TSetFromTemplateModal = (
  state: boolean
) => { type: string; payload: boolean };
export const setFromTemplateModalAction: TSetFromTemplateModal = state => {
  return { type: SET_FROM_TEMPLATE, payload: state };
};

// fetches templates
// ---------------------------------
// ---------------------------------

type FetchTemplatesRes =
  | { type: string; payload: Array<Template> }
  | { type: string; payload: string }
  | undefined;

type TFetchTemplates = (
  t: string | null
) => (
  dispatch: ThunkDispatch<State, void, Action>
) => Promise<FetchTemplatesRes>;

export const fetchTemplatesAction: TFetchTemplates = t => {
  return async (dispatch): Promise<FetchTemplatesRes> => {
    try {
      const res = await axiosWithAuth(t).get(`${api()}/api/auth/templates`);
      return dispatch({
        type: SET_TEMPLATES,
        payload: res.data.templates
      });
    } catch (error) {
      if (error.response) {
        return dispatch({
          type: SET_TEMPLATES_ERR,
          payload: error.response.data.error
        });
      } else {
        return;
      }
    }
  };
};

// delete template
// ---------------------------------
// ---------------------------------

type TDeleteTemplate = (
  t: string | null,
  id: string
) => (dispatch: ThunkDispatch<State, void, Action>) => Promise<Action>;

export const deleteTemplateAction: TDeleteTemplate = (t, id) => {
  return async (dispatch): Promise<Action> => {
    await axiosWithAuth(t).delete(`${api()}/api/auth/templates/${id}`);
    return dispatch({
      type: DELETE_TEMPLATE,
      payload: id
    });
  };
};

// set template save modal state (open or closed)
type TSetSaveTemplateModal = (
  state: boolean
) => { type: string; payload: boolean };
export const setSaveTemplateModalAction: TSetSaveTemplateModal = state => {
  return { type: SET_TEMPLATE_SAVE, payload: state };
};

// save template
// ---------------------------------
// ---------------------------------

type TSaveTemplate = (
  t: string | null,
  tempName: string,
  workout: WorkoutReducer,
  setTempName: React.Dispatch<React.SetStateAction<string>>,
  setMessage: React.Dispatch<
    React.SetStateAction<{
      success?: string | undefined;
      error?: string | undefined;
    }>
  >
) => Promise<void>;

export const saveTemplateAction: TSaveTemplate = async (
  t,
  tempName,
  workout,
  setTempName,
  setMessage
) => {
  try {
    await axiosWithAuth(t).post(`${api()}/api/auth/templates`, {
      name: tempName,
      title: workout.title,
      tags: workout.tags,
      notes: workout.notes,
      exercises: workout.exercises
    });
    setTempName('');
    setMessage({ success: 'Template created' });
  } catch (error) {
    if (error.response) {
      setMessage({ error: error.response.data.error });
    }
  }
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
      await axiosWithAuth(t).post(`${api()}/api/auth/workouts`, {
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
      await axiosWithAuth(t).put(`${api()}/api/auth/workouts/${workoutId}`, {
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
