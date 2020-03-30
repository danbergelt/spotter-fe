import {
  OPEN_MODAL,
  MODAL_CTX,
  SET_SCOPE,
  SET_DATE,
  SET_TIMESPAN,
  CHANGE_SCOPE,
  CLOSE_WORKOUT_MODAL,
  ADD_TOKEN
} from '../constants/index';
import { GlobalReducer } from 'src/types/State';
import { AnyAction } from 'redux';
import produce from 'immer';

const globalState: GlobalReducer = {
  t: null,
  ctx: null,
  scope: 'week',
  date: null,
  timeSpan: 0
};

// handles items such as access token, modal context, etc.

export const globalReducer = (
  state = globalState,
  action: AnyAction
): GlobalReducer => {
  return produce(state, draft => {
    switch (action.type) {
      case OPEN_MODAL:
        draft.date = action.payload.date;
        draft.ctx = action.payload.ctx;
        return;
      case ADD_TOKEN:
        draft.t = action.payload;
        return;
      case MODAL_CTX:
        draft.ctx = action.payload;
        return;
      case SET_SCOPE:
        draft.scope = action.payload;
        return;
      case SET_DATE:
        draft.date = action.payload;
        return;
      case SET_TIMESPAN:
        draft.timeSpan = action.payload;
        return;
      case CHANGE_SCOPE:
        draft.timeSpan = 0;
        draft.scope = action.payload;
        return;
      case CLOSE_WORKOUT_MODAL:
        draft.ctx = null;
        return;
      default:
        return draft;
    }
  });
};
