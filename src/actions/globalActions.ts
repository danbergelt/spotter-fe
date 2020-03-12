import { Moment } from 'moment';
import { Workout } from 'src/types/Workout';
import { ADD_TOKEN } from './addTokenActions';
import { Action } from 'redux';
import { ReduxAction, Ctx } from 'src/types/Types';
export const OPEN_MODAL = 'OPEN_MODAL';
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
export const closeWorkoutModalAction = (): Action => {
  return { type: CLOSE_WORKOUT_MODAL };
};

// increment/decrement timespan
// e.g. move ahead/move back in time by one week/month at a time

export const incOrDecAction = (
  incOrDec: string,
  timespan: number
): ReduxAction<number> => {
  if (incOrDec === 'inc') {
    return { type: SET_TIMESPAN, payload: timespan + 1 };
  }

  return { type: SET_TIMESPAN, payload: timespan - 1 };
};

interface OpenModal {
  date: Moment;
  ctx: Ctx;
  workout?: Workout;
}
export const openWorkoutModalAction = (
  date: Moment,
  ctx: Ctx,
  workout: Workout
): ReduxAction<OpenModal> => {
  return { type: OPEN_MODAL, payload: { date, ctx, workout } };
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
