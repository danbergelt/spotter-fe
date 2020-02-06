import { reducer } from '../../../reducers/index';
import { LOGOUT } from 'src/actions/globalActions';
import { ADD_TOKEN } from 'src/actions/addTokenActions';

describe('logout', () => {
  test('should handle LOGOUT', () => {
    const oldReducer = reducer(undefined, {
      type: ADD_TOKEN,
      payload: 'token'
    });
    expect(oldReducer.globalReducer.t).toBe('token');
    const newReducer = reducer({}, { type: LOGOUT });
    expect(newReducer.globalReducer.t).toBe(null);
  });
});
