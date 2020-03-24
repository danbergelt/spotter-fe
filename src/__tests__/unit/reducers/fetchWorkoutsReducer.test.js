import { fetchWorkoutsReducer } from '../../../reducers/fetchWorkoutsReducer';
import { FETCH_WORKOUTS } from '../../../actions/fetchWorkoutsActions';
import { CREATE_WORKOUT, EDIT_WORKOUT } from 'src/actions/optionsActions';

describe('fetch workout reducer tests', () => {
  test('should return initial state', () => {
    expect(fetchWorkoutsReducer(undefined, {})).toEqual({
      workouts: []
    });
  });

  test('should handle CREATE_WORKOUT', () => {
    expect(
      fetchWorkoutsReducer(undefined, {
        type: CREATE_WORKOUT,
        payload: { foo: 'bar' }
      })
    ).toEqual({ workouts: [{ foo: 'bar' }] });
  });

  test('should handle EDIT_WORKOUT', () => {
    expect(
      fetchWorkoutsReducer(
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
      fetchWorkoutsReducer(undefined, {
        type: FETCH_WORKOUTS,
        payload: 'foo'
      })
    ).toEqual({ workouts: 'foo' });
  });
});
