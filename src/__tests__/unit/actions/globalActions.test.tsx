import configureMockStore from 'redux-mock-store';
import { CLOSE_MODAL, LOGOUT, ADD_TOKEN, OPEN_MODAL } from 'src/constants';
import {
  closeWorkoutModalAction,
  logOutAction,
  addTokenAction,
  openWorkoutModalAction
} from 'src/actions/globalActions';
import moment from 'moment';

const mockStore = configureMockStore();

describe('global actions', () => {
  test('close modal', () => {
    const expectedActions = [{ type: CLOSE_MODAL }];
    const store = mockStore();
    store.dispatch(closeWorkoutModalAction());
    expect(store.getActions()).toEqual(expectedActions);
  });

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

  test('open modal action', () => {
    const date = moment();
    const expectedActions = [
      { type: OPEN_MODAL, payload: { date, workout: undefined } }
    ];
    const store = mockStore();
    store.dispatch(openWorkoutModalAction(date, undefined));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
