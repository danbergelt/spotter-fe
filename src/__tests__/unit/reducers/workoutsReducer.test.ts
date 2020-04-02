import { workoutsReducer } from '../../../reducers/workoutsReducer';
import {
  CREATE_WORKOUT,
  EDIT_WORKOUT,
  FETCH_WORKOUTS,
  DELETE_WORKOUT,
  UPDATE_TAG,
  DELETE_TAG
} from 'src/constants/index';
import { workout } from 'src/__testUtils__/workout';

describe('fetch workout reducer tests', () => {
  test('should return initial state', () => {
    expect(workoutsReducer(undefined, { type: 'foo' })).toEqual({
      workouts: []
    });
  });

  test('should handle CREATE_WORKOUT', () => {
    expect(
      workoutsReducer(undefined, {
        type: CREATE_WORKOUT,
        payload: workout
      })
    ).toEqual({ workouts: [workout] });
  });

  test('should handle EDIT_WORKOUT', () => {
    expect(
      workoutsReducer(
        {
          workouts: [workout]
        },
        {
          type: EDIT_WORKOUT,
          payload: { ...workout, title: 'new title' }
        }
      )
    ).toEqual({
      workouts: [{ ...workout, title: 'new title' }]
    });
  });

  test('should handle FETCH_WORKOUTS', () => {
    expect(
      workoutsReducer(undefined, {
        type: FETCH_WORKOUTS,
        payload: [workout]
      })
    ).toEqual({ workouts: [workout] });
  });

  test('should handle DELETE_WORKOUT', () => {
    expect(
      workoutsReducer(
        { workouts: [workout] },
        { type: DELETE_WORKOUT, payload: workout._id }
      )
    ).toEqual({ workouts: [] });
  });

  test('should handle UPDATE_TAG', () => {
    expect(
      workoutsReducer(
        { workouts: [workout] },
        {
          type: UPDATE_TAG,
          payload: { ...workout.tags[0], content: 'new content' }
        }
      )
    ).toEqual({
      workouts: [
        { ...workout, tags: [{ ...workout.tags[0], content: 'new content' }] }
      ]
    });
  });

  test('should handle DELETE_TAG', () => {
    expect(
      workoutsReducer(
        { workouts: [workout] },
        { type: DELETE_TAG, payload: { ...workout.tags[0] } }
      )
    ).toEqual({ workouts: [{ ...workout, tags: [] }] });
  });
});
