import { globalReducer } from '../../../reducers/globalReducer';
import { ADD_TOKEN } from '../../../actions/addTokenActions';
import {
  CHANGE_SCOPE,
  SET_SCOPE,
  SET_DATE,
  SET_TIMESPAN,
  MODAL_CTX
} from 'src/actions/globalActions';

describe('global reducer', () => {
  test('should return initial state', () => {
    expect(globalReducer(undefined, {})).toEqual({
      t: null,
      ctx: null,
      scope: {
        label: 'Week',
        value: 'Week'
      },
      date: null,
      timeSpan: 0
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
      scope: {
        label: 'Week',
        value: 'Week'
      },
      date: null,
      timeSpan: 0
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
      scope: {
        label: 'Week',
        value: 'Week'
      },
      date: null,
      timeSpan: 0
    });
  });

  test('should handle SET_SCOPE', () => {
    expect(
      globalReducer(undefined, {
        type: SET_SCOPE,
        payload: { value: 'test', label: 'test' }
      })
    ).toEqual({
      ctx: null,
      t: null,
      scope: {
        label: 'test',
        value: 'test'
      },
      date: null,
      timeSpan: 0
    });
  });

  test('should handle SET_DATE', () => {
    expect(
      globalReducer(undefined, {
        type: SET_DATE,
        payload: { date: 'date' }
      })
    ).toEqual({
      ctx: null,
      t: null,
      scope: {
        label: 'Week',
        value: 'Week'
      },
      date: { date: 'date' },
      timeSpan: 0
    });
  });
  test('should handle SET_TIMESPAN', () => {
    expect(
      globalReducer(undefined, {
        type: SET_TIMESPAN,
        payload: 5
      })
    ).toEqual({
      ctx: null,
      t: null,
      scope: {
        label: 'Week',
        value: 'Week'
      },
      date: null,
      timeSpan: 5
    });
  });
  test('should handle CHANGE_SCOPE', () => {
    expect(
      globalReducer(undefined, {
        type: CHANGE_SCOPE,
        payload: { value: 'test', label: 'test' }
      })
    ).toEqual({
      ctx: null,
      t: null,
      scope: {
        label: 'test',
        value: 'test'
      },
      date: null,
      timeSpan: 0
    });
  });
});
