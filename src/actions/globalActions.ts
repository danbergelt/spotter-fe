import { ADD_TOKEN, LOGOUT } from '../constants/index';
import { Action } from 'redux';
import { ReduxAction } from 'src/types';

/*== Global actions =====================================================

These actions handle state that impact the entire application, such as auth,
certain contexts (such as the 'add' or 'view' context), and resetting the
workout modal

log out
  removes token from memory and fetches a dead refresh cookie
add token
  adds an auth token to memory

*/

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
