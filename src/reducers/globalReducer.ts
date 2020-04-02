import { ADD_TOKEN } from '../constants/index';
import { GlobalReducer } from 'src/types/State';
import { AnyAction } from 'redux';
import produce from 'immer';

const globalState: GlobalReducer = {
  token: null
};

export const globalReducer = (
  state = globalState,
  action: AnyAction
): GlobalReducer => {
  return produce(state, draft => {
    switch (action.type) {
      case ADD_TOKEN:
        draft.token = action.payload;
        return draft;
      default:
        return draft;
    }
  });
};
