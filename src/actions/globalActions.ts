import { Moment } from 'moment';
import { Workout } from 'src/types/Workout';
import { ADD_TOKEN, OPEN_MODAL, LOGOUT, CLOSE_MODAL } from '../constants/index';
import { Action } from 'redux';
import { ReduxAction } from 'src/types/Types';

/*== Global actions =====================================================

These actions handle state that impact the entire application, such as auth,
certain contexts (such as the 'add' or 'view' context), and resetting the
workout modal

closeWorkoutModal
  resets the 'add' or 'view' context and the workout modal fields
openWorkoutModal
  injects the selected date and the workout (if ctx is 'view')
log out
  removes token from memory and fetches a dead refresh cookie
add token
  adds an auth token to memory

*/

// close workout modal
export const closeWorkoutModalAction = (): Action => {
  return { type: CLOSE_MODAL };
};

// open the workout modal
export const openWorkoutModalAction = (
  date: Moment,
  workout?: Workout
): ReduxAction<{ date: Moment; workout?: Workout }> => {
  return { type: OPEN_MODAL, payload: { date, workout } };
};

// logout
export const logOutAction = (): Action => {
  return { type: LOGOUT };
};

// save token (triggered by log in, sign up, and change password request)
export const addTokenAction = (
  token: string | null
): ReduxAction<string | null> => {
  return { type: ADD_TOKEN, payload: token };
};
