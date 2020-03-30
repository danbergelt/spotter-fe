import { tagsReducer } from '../../../reducers/tagsReducer';
import {
  UPDATE_TAG,
  DELETE_TAG,
  ADD_TAGS,
  CREATE_TAG,
  CLOSE_WORKOUT_MODAL
} from 'src/constants/index';

describe('tag reducer', () => {
  test('should return initial state', () => {
    expect(tagsReducer(undefined, {})).toEqual({
      tags: []
    });
  });

  test('should handle ADD_TAG', () => {
    expect(
      tagsReducer({ tags: [] }, { type: ADD_TAGS, payload: [{ foo: 'bar' }] })
    ).toEqual({ tags: [{ foo: 'bar' }] });
  });

  test('should handle CREATE_TAG', () => {
    expect(
      tagsReducer(
        {
          tags: [{ foo: 'bar' }]
        },
        { type: CREATE_TAG, payload: { bar: 'baz' } }
      )
    ).toEqual({ tags: [{ foo: 'bar' }, { bar: 'baz' }] });
  });

  test('should handle DELETE_TAG', () => {
    expect(
      tagsReducer(
        { tags: [{ _id: 0 }] },
        { type: DELETE_TAG, payload: { _id: 0 } }
      )
    ).toEqual({ tags: [] });
  });

  test('should handle CLOSE_WORKOUT_MODAL', () => {
    expect(
      tagsReducer({ tags: [{ foo: 'bar' }] }, { type: CLOSE_WORKOUT_MODAL })
    ).toEqual({ tags: [] });
  });

  test('should handle UPDATE_TAG', () => {
    expect(
      tagsReducer(
        { tags: [{ _id: 0, foo: 'bar' }] },
        { type: UPDATE_TAG, payload: { _id: 0, bar: 'baz' } }
      )
    ).toEqual({ tags: [{ _id: 0, bar: 'baz' }] });
  });
});
