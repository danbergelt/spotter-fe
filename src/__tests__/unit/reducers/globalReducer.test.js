import { globalReducer } from '../../../reducers/globalReducer';
import { ADD_TOKEN, MODAL_CTX } from 'src/constants/index';

describe('global reducer', () => {
  test('should return initial state', () => {
    expect(globalReducer(undefined, {})).toEqual({
      t: null,
      ctx: null,
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
      ctx: null,
      date: null
    });
  });

  test('should handle MODAL_CTX', () => {
    expect(
      globalReducer(undefined, {
        type: MODAL_CTX,
        payload: 'ctx'
      })
    ).toEqual({
      ctx: 'ctx',
      t: null,
      date: null
    });
  });
});
