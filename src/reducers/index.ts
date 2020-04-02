import { combineReducers, AnyAction } from 'redux';
import { workoutReducer } from './workoutReducer';
import { workoutsReducer } from './workoutsReducer';
import { globalReducer } from './globalReducer';
import { LOGOUT } from 'src/constants/index';
import { State } from 'src/types';

const appReducer = combineReducers({
  workoutReducer,
  workoutsReducer,
  globalReducer
});

// logout functionality
// assigns the state to a temporary undefined variable that serves to 'reset' the state
// then, once a user logs in, state is rehydrated
export const reducer = (state: State | undefined, action: AnyAction): State => {
  if (action.type === LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};
