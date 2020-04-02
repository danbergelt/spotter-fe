import { globalReducer } from '../../../reducers/globalReducer';
import { ADD_TOKEN } from 'src/constants/index';
import { AnyAction } from 'redux';

describe('global reducer', () => {
  test('should return initial state', () => {
    expect(globalReducer(undefined, {} as AnyAction)).toEqual({
      token: null
    });
  });

  test('should handle ADD_TOKEN', () => {
    expect(
      globalReducer(undefined, {
        type: ADD_TOKEN,
        payload: 'token'
      })
    ).toEqual({
      token: 'token'
    });
  });
});
