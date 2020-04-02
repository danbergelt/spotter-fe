import { workoutReducer } from '../../../reducers/workoutReducer';
import {
  ADD_WORKOUT_TITLE,
  RESET_NOTES,
  ADD_WORKOUT_NOTES,
  ADD_EXERCISE,
  TOGGLE_TAG,
  UPDATE_TAG,
  DELETE_TAG,
  FROM_TEMPLATE,
  DEL_EXERCISE,
  HANDLE_EDIT,
  OPEN_MODAL,
  CLOSE_MODAL
} from '../../../constants/index';
import { AnyAction } from 'redux';
import { tag } from 'src/__testUtils__/tag';
import { workout } from 'src/__testUtils__/workout';

const state = {
  title: '',
  notes: '',
  tags: [],
  exercises: [],
  date: '',
  _id: null
};

describe('add workout reducer', () => {
  test('should return initial state', () => {
    expect(workoutReducer(undefined, {} as AnyAction)).toEqual(state);
  });

  test('should handle OPEN_MODAL', () => {
    expect(
      workoutReducer(undefined, { type: OPEN_MODAL, payload: workout })
    ).toEqual({
      title: workout.title,
      notes: workout.notes,
      tags: workout.tags,
      exercises: workout.exercises,
      date: workout.date,
      _id: workout._id
    });
  });

  test('should handle ADD_WORKOUT_TITLE', () => {
    expect(
      workoutReducer(undefined, {
        type: ADD_WORKOUT_TITLE,
        payload: 'title'
      })
    ).toEqual({
      ...state,
      title: 'title'
    });
  });

  test('should handle ADD_WORKOUT_NOTES', () => {
    expect(
      workoutReducer(undefined, {
        type: ADD_WORKOUT_NOTES,
        payload: 'notes'
      })
    ).toEqual({
      ...state,
      notes: 'notes'
    });
  });

  test('should handle RESET_NOTES', () => {
    expect(
      workoutReducer(
        {
          ...state,
          notes: 'notes'
        },
        { type: RESET_NOTES }
      )
    ).toEqual(state);
  });

  test('should handle ADD_EXERCISE', () => {
    expect(
      workoutReducer(undefined, {
        type: ADD_EXERCISE,
        payload: { name: 'name' }
      })
    ).toEqual({
      ...state,
      exercises: [{ name: 'name' }]
    });
  });

  test('should handle TOGGLE_TAG - add', () => {
    expect(
      workoutReducer(undefined, {
        type: TOGGLE_TAG,
        payload: { tag: 'tag' }
      })
    ).toEqual({
      ...state,
      tags: [{ tag: 'tag' }]
    });
  });

  test('should handle TOGGLE_TAG - remove', () => {
    expect(
      workoutReducer(
        {
          ...state,
          tags: [tag]
        },
        { type: TOGGLE_TAG, payload: tag }
      )
    ).toEqual(state);
  });

  test('should handle DELETE_TAG', () => {
    expect(
      workoutReducer(
        {
          ...state,
          tags: [tag]
        },
        { type: DELETE_TAG, payload: { _id: 'id', tag: 'tag' } }
      )
    ).toEqual(state);
  });

  test('should handle UPDATE_TAG', () => {
    expect(
      workoutReducer(
        {
          ...state,
          tags: [tag]
        },
        {
          type: UPDATE_TAG,
          payload: { _id: 'foo', color: 'new', content: 'bar' }
        }
      )
    ).toEqual({
      ...state,
      tags: [{ _id: 'foo', color: 'new', content: 'bar' }]
    });
  });

  test('should handle FROM_TEMPLATE', () => {
    expect(
      workoutReducer(undefined, {
        type: FROM_TEMPLATE,
        payload: {
          title: 't',
          exercises: [],
          tags: 'tags',
          notes: 'n',
          date: 'some date',
          _id: null
        }
      })
    ).toEqual({
      title: 't',
      exercises: [],
      tags: 'tags',
      notes: 'n',
      date: 'some date',
      _id: null
    });
  });

  test('should handle DEL_EXERCISE', () => {
    expect(
      workoutReducer(
        {
          ...state,
          exercises: [workout.exercises[0]]
        },
        { type: DEL_EXERCISE, payload: 0 }
      )
    ).toEqual(state);
  });

  test('should handle HANDLE_EDIT', () => {
    expect(
      workoutReducer(
        {
          ...state,
          exercises: [workout.exercises[0]]
        },
        { type: HANDLE_EDIT, payload: { exercise: { name: 'edited' }, i: 0 } }
      )
    ).toEqual({
      ...state,
      exercises: [{ name: 'edited' }]
    });
  });

  test('should handle CLOSE_MODAL', () => {
    expect(workoutReducer(workout, { type: CLOSE_MODAL })).toEqual(state);
  });
});
