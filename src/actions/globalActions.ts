import { Moment } from 'moment';
import { Workout } from 'src/types/Workout';
import {
  ADD_TOKEN,
  OPEN_MODAL,
  LOGOUT,
  CLOSE_WORKOUT_MODAL
} from '../constants/index';
import { Action } from 'redux';
import { ReduxAction, Ctx } from 'src/types/Types';

// close workout modal (resets various states across app)
export const closeWorkoutModalAction = (): Action => {
  return { type: CLOSE_WORKOUT_MODAL };
};

// open a workout modal (accepts the current date, the ctx ('add' or 'view), and the optional workout if the ctx is 'view')
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

// logout --> removes token from memory, and fetches a dead refresh cookie from the server
export const logOutAction = (): Action => {
  return { type: LOGOUT };
};

// add a token to app state --> this action is triggered on log in/sign up
export const addTokenAction = (
  token: string | null
): ReduxAction<string | null> => {
  return { type: ADD_TOKEN, payload: token };
};
