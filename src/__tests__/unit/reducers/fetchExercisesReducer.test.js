import { fetchExercisesReducer } from '../../../reducers/fetchExercisesReducer';
import {
  FETCH_EXERCISES_SUCCESS,
  FETCH_EXERCISES_ERROR
} from '../../../actions/fetchExercisesActions';

describe('fetch exercises reducer tests', () => {
  test('should return initial state', () => {
    expect(fetchExercisesReducer(undefined, {})).toEqual({
      err: null,
      savedExercises: []
    });
  });

  test('should handle FETCH_EXERCISES_SUCCESS', () => {
    expect(
      fetchExercisesReducer(undefined, {
        type: FETCH_EXERCISES_SUCCESS,
        payload: [{ name: 'name', _id: 1 }]
      })
    ).toEqual({ err: null, savedExercises: [{ name: 'name', _id: 1 }] });
  });

  test('should handle FETCH_EXERCISES_ERROR', () => {
    expect(
      fetchExercisesReducer(undefined, {
        type: FETCH_EXERCISES_ERROR,
        payload: 'TEST error'
      })
    ).toEqual({ err: 'TEST error', savedExercises: [] });
  });
});
