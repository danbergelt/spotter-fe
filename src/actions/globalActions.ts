import { Moment } from 'moment';
import { History } from 'history';
import { FROM_SAVED } from './workoutActions';
import { Workout } from 'src/types/Workout';
import { ADD_TOKEN } from './addTokenActions';
import { Action } from 'redux';
import { State } from 'src/types/State';
import { ThunkDispatch } from 'redux-thunk';
import { ReduxAction } from 'src/types/Types';

export const MODAL_CTX = 'MODAL_CTX';
export const LOGOUT = 'LOGOUT';
export const SET_SCOPE = 'SET_SCOPE';
export const SET_DATE = 'SET_DATE';
export const SET_TIMESPAN = 'SET_TIMESPAN';
export const CHANGE_SCOPE = 'CHANGE_SCOPE';
export const CLOSE_WORKOUT_MODAL = 'CLOSE_WORKOUT_MODAL';

// sets dashboard scope to either weekly/monthly
export const setScopeAction = (option: string): ReduxAction<string> => {
  return {
    type: CHANGE_SCOPE,
    payload: option
  };
};

// closes primary workout modal
type TCloseWorkoutModal = () => { type: string };
export const closeWorkoutModalAction: TCloseWorkoutModal = () => {
  return { type: CLOSE_WORKOUT_MODAL };
};

// increment/decrement timespan
// e.g. move ahead/move back in time by one week/month at a time
type TIncOrDec = (
  incOrDec: string,
  timespan: number
) => { type: string; payload: number } | undefined;

export const incOrDecAction: TIncOrDec = (incOrDec, timespan) => {
  if (incOrDec === 'inc') {
    return { type: SET_TIMESPAN, payload: timespan + 1 };
  }
  if (incOrDec === 'dec') {
    return { type: SET_TIMESPAN, payload: timespan - 1 };
  }
  return;
};

// the add workout modal is the view that users get to add a new workout
// the view workout modal is the view users get when they select a pre-exiting workout to view/modify/delete, etc.
// both the view workout modal and add workout modal use the same component
// the difference is that certain state functionality is triggered upon opening the modal that caters to either modal state
// this includes save vs. update workout HTTP request, as well as loading saved data into the view workout modal

// opens add workout modal
interface AddWorkoutModal {
  date: Moment;
  setModal: Function;
  t: string | null;
  history: History;
  workout?: Workout;
}

type TAddWorkoutModal = (
  paramsHelper: AddWorkoutModal
) => (dispatch: ThunkDispatch<State, void, Action>) => void;

export const addWorkoutModalAction: TAddWorkoutModal = paramsHelper => {
  const { date, setModal } = paramsHelper;

  return (dispatch): void => {
    // saves the clicked date to state
    // when saved, the date is then associated with that workout
    dispatch({
      type: SET_DATE,
      payload: date
    });

    // this context is what determines the differences in functionality in the two modal types
    dispatch({
      type: MODAL_CTX,
      payload: 'add'
    });

    //opens modal
    setModal(true);
  };
};

//opens view workout modal
export const viewWorkoutModalAction: TAddWorkoutModal = paramsHelper => {
  const { date, setModal, workout } = paramsHelper;

  // functionality is largely the same as add workout, with some key differences
  return (dispatch): void => {
    dispatch({
      type: SET_DATE,
      payload: date
    });
    dispatch({
      type: MODAL_CTX,
      payload: 'view'
    });

    // matches the clicked workout, saves the clicked workout to state, and populates the modal with that clicked workout's data
    dispatch({
      type: FROM_SAVED,
      payload: workout
    });
    setModal(true);
  };
};

// logs a user out
// removes token from memory, and fetches a dead refresh cookie from the server
type TLogOut = () => Action;
export const logOutAction: TLogOut = () => {
  return { type: LOGOUT };
};

// add a token to state
// this action is triggered on log in/sign up
type TAddToken = (token: string) => { type: string; payload: string };
export const addTokenAction: TAddToken = token => {
  return { type: ADD_TOKEN, payload: token };
};
