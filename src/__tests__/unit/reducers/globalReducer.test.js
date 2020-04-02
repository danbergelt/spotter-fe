import { globalReducer } from '../../../reducers/globalReducer';
import { ADD_TOKEN } from 'src/constants/index';

describe('global reducer', () => {
  test('should return initial state', () => {
    expect(globalReducer(undefined, {})).toEqual({
      t: null,
      date: null
    });
  });

  test('should handle ADD_TOKEN', () => {
    expect(
      globalReducer(undefined, {
        type: ADD_TOKEN,
        payload: 'token'
      })
    ).toEqual({
      t: 'token',
      date: null
    });
  });
});
