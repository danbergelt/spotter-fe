import { fetchExercisesReducer } from '../../../reducers/fetchExercisesReducer';
import {
  FETCH_EXERCISES,
  CREATE_EXERCISE,
  DELETE_SAVED_EXERCISE
} from '../../../actions/fetchExercisesActions';

describe('fetch exercises reducer tests', () => {
  test('should return initial state', () => {
    expect(fetchExercisesReducer(undefined, {})).toEqual({
      savedExercises: []
    });
  });

  test('should handle FETCH_EXERCISES', () => {
    expect(
      fetchExercisesReducer(undefined, {
        type: FETCH_EXERCISES,
        payload: [{ name: 'name', _id: 1 }]
      })
    ).toEqual({ savedExercises: [{ name: 'name', _id: 1 }] });
  });

  test('should handle CREATE_EXERCISE', () => {
    expect(
      fetchExercisesReducer(
        { savedExercises: [{ foo: 'bar' }] },
        { type: CREATE_EXERCISE, payload: { bar: 'baz' } }
      )
    ).toEqual({ savedExercises: [{ foo: 'bar' }, { bar: 'baz' }] });
  });

  test('should handle DELETE_SAVED_EXERCISE', () => {
    expect(
      fetchExercisesReducer(
        { savedExercises: [{ _id: 0 }] },
        { type: DELETE_SAVED_EXERCISE, payload: 0 }
      )
    ).toEqual({ savedExercises: [] });
  });
});
