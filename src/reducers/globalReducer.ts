import {
  OPEN_MODAL,
  MODAL_CTX,
  CLOSE_MODAL,
  ADD_TOKEN
} from '../constants/index';
import { GlobalReducer } from 'src/types/State';
import { AnyAction } from 'redux';
import produce from 'immer';

const globalState: GlobalReducer = {
  t: null,
  ctx: null,
  date: null
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
      case CLOSE_MODAL:
        draft.ctx = null;
        return;
      default:
        return draft;
    }
  });
};
