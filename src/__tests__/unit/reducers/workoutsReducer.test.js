import { workoutsReducer } from '../../../reducers/workoutsReducer';
import {
  CREATE_WORKOUT,
  EDIT_WORKOUT,
  FETCH_WORKOUTS
} from 'src/constants/index';

describe('fetch workout reducer tests', () => {
  test('should return initial state', () => {
    expect(workoutsReducer(undefined, {})).toEqual({
      workouts: []
    });
  });

  test('should handle CREATE_WORKOUT', () => {
    expect(
      workoutsReducer(undefined, {
        type: CREATE_WORKOUT,
        payload: { foo: 'bar' }
      })
    ).toEqual({ workouts: [{ foo: 'bar' }] });
  });

  test('should handle EDIT_WORKOUT', () => {
    expect(
      workoutsReducer(
        {
          workouts: [
            { _id: 0, foo: 'bar' },
            { _id: 1, a: 'b' }
          ]
        },
        { type: EDIT_WORKOUT, payload: { _id: 0, bar: 'baz' } }
      )
    ).toEqual({
      workouts: [
        { _id: 0, bar: 'baz' },
        { _id: 1, a: 'b' }
      ]
    });
  });

  test('should handle FETCH_WORKOUTS', () => {
    expect(
      workoutsReducer(undefined, {
        type: FETCH_WORKOUTS,
        payload: 'foo'
      })
    ).toEqual({ workouts: 'foo' });
  });
});
