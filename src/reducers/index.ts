import { combineReducers, AnyAction } from 'redux';
import { workoutReducer } from './workoutReducer';
import { fetchWorkoutsReducer } from './fetchWorkoutsReducer';
import { globalReducer } from './globalReducer';
import { tagsReducer } from './tagsReducer';
import { optionsReducer } from './optionsReducer';
import { LOGOUT } from 'src/constants/index';
import { State } from 'src/types/State';

const appReducer = combineReducers({
  workoutReducer,
  fetchWorkoutsReducer,
  globalReducer,
  tagsReducer,
  optionsReducer
});

// logout functionality -->
// no mutation, assigns the state to a temporary undefined variable that serves to 'reset' the state
// then, once a user logs in, state is rehydrated
type TReducer = (state: State | undefined, action: AnyAction) => State;
export const reducer: TReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};
