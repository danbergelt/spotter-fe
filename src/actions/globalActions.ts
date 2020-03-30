import { Moment } from 'moment';
import { Workout } from 'src/types/Workout';
import {
  ADD_TOKEN,
  OPEN_MODAL,
  LOGOUT,
  SET_TIMESPAN,
  CHANGE_SCOPE,
  CLOSE_WORKOUT_MODAL
} from '../constants/index';
import { Action } from 'redux';
import { ReduxAction, Ctx } from 'src/types/Types';

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
  workout?: Workout
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
export const addTokenAction = (
  token: string | null
): ReduxAction<string | null> => {
  return { type: ADD_TOKEN, payload: token };
};
