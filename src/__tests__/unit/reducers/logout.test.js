import { reducer } from '../../../reducers/index';
import { LOGOUT, ADD_TOKEN } from 'src/constants/index';

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
