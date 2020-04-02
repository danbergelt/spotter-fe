import configureMockStore from 'redux-mock-store';
import { LOGOUT, ADD_TOKEN } from 'src/constants';
import { logOutAction, addTokenAction } from 'src/actions/globalActions';

const mockStore = configureMockStore();

describe('global actions', () => {
  test('logout', () => {
    const expectedActions = [{ type: LOGOUT }];
    const store = mockStore();
    store.dispatch(logOutAction());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('add token', () => {
    const expectedActions = [{ type: ADD_TOKEN, payload: 'foo' }];
    const store = mockStore();
    store.dispatch(addTokenAction('foo'));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
