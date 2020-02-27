import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  CHANGE_SCOPE,
  handleScopeChangeAction,
  SET_TIMESPAN,
  incOrDecAction,
  LOGOUT
} from '../../../actions/globalActions';

const mockStore = configureMockStore([thunk]);

describe('global actions', () => {
  test('changes time scope', () => {
    const tester = { value: 'tester', label: 'tester' };

    const expectedAction = [{ type: CHANGE_SCOPE, payload: tester }];

    const store = mockStore();

    store.dispatch(handleScopeChangeAction(tester));

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
