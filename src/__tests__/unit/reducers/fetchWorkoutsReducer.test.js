import { fetchWorkoutsReducer } from '../../../reducers/fetchWorkoutsReducer';
import {
  FETCH_WORKOUTS_START,
  FETCH_WORKOUTS_SUCCESS,
  FETCH_WORKOUTS_ERROR
} from '../../../actions/fetchWorkoutsActions';

describe('fetch workout reducer tests', () => {
  test('should return initial state', () => {
    expect(fetchWorkoutsReducer(undefined, {})).toEqual({
      err: null,
      isLoading: false,
      workouts: []
    });
  });

  test('should handle FETCH_WORKOUTS_START', () => {
    expect(
      fetchWorkoutsReducer(undefined, {
        type: FETCH_WORKOUTS_START
      })
    ).toEqual({ err: null, isLoading: true, workouts: [] });
  });

  test('should handle FETCH_WORKOUTS_SUCCESS', () => {
    expect(
      fetchWorkoutsReducer(undefined, {
        type: FETCH_WORKOUTS_SUCCESS,
        payload: [{ name: 'name' }]
      })
    ).toEqual({ err: null, isLoading: false, workouts: [{ name: 'name' }] });
  });

  test('should handle FETCH_WORKOUTS_ERROR', () => {
    expect(
      fetchWorkoutsReducer(undefined, {
        type: FETCH_WORKOUTS_ERROR,
        payload: 'TEST error'
      })
    ).toEqual({ err: 'TEST error', isLoading: false, workouts: [] });
  });
});
