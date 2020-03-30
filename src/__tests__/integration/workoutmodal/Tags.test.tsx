import React from 'react';
import wrapper from 'src/__testUtils__/wrapper';
import Tags from 'src/components/dash/workoutmodal/Tags';
import { reducer } from 'src/reducers';
import { TOGGLE_TAG } from 'src/constants/index';

describe('workout tags', () => {
  test('displays no tags found when no tags exist on workout', () => {
    const { getByText } = wrapper(reducer, <Tags />);

    getByText(/no tags/i);
  });

  test('displays tags', () => {
    const { store, getByText } = wrapper(reducer, <Tags />);

    store.dispatch({
      type: TOGGLE_TAG,
      payload: { color: 'red', content: 'foo', _id: 'bar' }
    });

    getByText(/foo/i);
  });
});
