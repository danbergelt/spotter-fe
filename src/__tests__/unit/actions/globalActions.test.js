import configureMockStore from 'redux-mock-store';
import {
  handleScopeChangeAction,
  incOrDecAction,
  setScopeAction
} from 'src/actions/globalActions';
import { CHANGE_SCOPE, SET_TIMESPAN, LOGOUT } from 'src/constants/index';

const mockStore = configureMockStore();

describe('global actions', () => {
  test('changes time scope', () => {
    const expectedAction = [{ type: CHANGE_SCOPE, payload: 'week' }];

    const store = mockStore();

    store.dispatch(setScopeAction('week'));

    expect(store.getActions()).toEqual(expectedAction);
  });

  test('increments date', () => {
    const expectedAction = [{ type: SET_TIMESPAN, payload: 1 }];

    const store = mockStore();

    store.dispatch(incOrDecAction('inc', 0));

    expect(store.getActions()).toEqual(expectedAction);
  });

  test('decrements date', () => {
    const expectedAction = [{ type: SET_TIMESPAN, payload: -1 }];

    const store = mockStore();

    store.dispatch(incOrDecAction('dec', 0));

    expect(store.getActions()).toEqual(expectedAction);
  });
});
