import { ADD_TOKEN } from '../actions/addTokenActions';
import {
  MODAL_CTX,
  SET_SCOPE,
  SET_DATE,
  SET_TIMESPAN,
  CHANGE_SCOPE,
  CLOSE_WORKOUT_MODAL
} from '../actions/globalActions';
import { GlobalReducer } from 'src/types/State';
import { AnyAction } from 'redux';

const globalState: GlobalReducer = {
  t: null,
  ctx: null,
  scope: { value: 'Week', label: 'Week' },
  date: null,
  timeSpan: 0
};

// handles items such as access token, modal context, etc.

export const globalReducer = (
  state = globalState,
  action: AnyAction
): GlobalReducer => {
  switch (action.type) {
    case ADD_TOKEN:
      return {
        ...state,
        t: action.payload
      };
    case MODAL_CTX:
      return {
        ...state,
        ctx: action.payload
      };
    case SET_SCOPE:
      return {
        ...state,
        scope: action.payload
      };
    case SET_DATE:
      return {
        ...state,
        date: action.payload
      };
    case SET_TIMESPAN:
      return {
        ...state,
        timeSpan: action.payload
      };
    case CHANGE_SCOPE:
      return {
        ...state,
        timeSpan: 0,
        scope: action.payload
      };
    case CLOSE_WORKOUT_MODAL:
      return {
        ...state,
        ctx: null
      };
    default:
      return state;
  }
};
