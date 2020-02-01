import { tagsReducer } from '../../../reducers/tagsReducer';
import {
  RESET_TAGS,
  FETCH_TAGS_START,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_ERROR
} from '../../../actions/tagsActions';

describe('tag reducer', () => {
  test('should return initial state', () => {
    expect(tagsReducer(undefined, {})).toEqual({
      isLoading: false,
      err: null,
      tags: []
    });
  });

  test('should handle RESET_TAGS', () => {
    expect(
      tagsReducer({ tags: { tag: 'tag would go here' } }, { type: RESET_TAGS })
    ).toEqual({ tags: [] });
  });

  test('should handle FETCH_TAGS_START', () => {
    expect(tagsReducer(undefined, { type: FETCH_TAGS_START })).toEqual({
      err: null,
      isLoading: true,
      tags: []
    });
  });

  test('should handle FETCH_TAGS_SUCCESS ', () => {
    expect(
      tagsReducer(undefined, {
        type: FETCH_TAGS_SUCCESS,
        payload: [{ tag: 'tag' }]
      })
    ).toEqual({ err: null, isLoading: false, tags: [{ tag: 'tag' }] });
  });

  test('should handle FETCH_TAGS_ERROR', () => {
    expect(
      tagsReducer(undefined, {
        type: FETCH_TAGS_ERROR,
        payload: 'TEST error'
      })
    ).toEqual({ err: 'TEST error', isLoading: false, tags: [] });
  });
});
