import { reducer } from './reducers/index';
import {
  createStore,
  applyMiddleware,
  CombinedState,
  Store,
  AnyAction
} from 'redux';
import thunk from 'redux-thunk';
import { State } from './types/State';

export const store: Store<CombinedState<State>, AnyAction> = createStore(
  reducer,
  applyMiddleware(thunk)
);
