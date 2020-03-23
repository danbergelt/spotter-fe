import React from 'react';
import wrapper from 'src/__testUtils__/wrapper';
import { reducer } from 'src/reducers';
import Add from 'src/components/dash/workoutmodal/actions/tags/Add';
import { hs } from 'src/__testUtils__/hs';
import { tag } from 'src/__testUtils__/tag';
import Tags from 'src/components/dash/workoutmodal/Tags';
import { fireEvent } from '@testing-library/dom';

describe('add tags to current workout', () => {
  test('renders', () => {
    const { getByText } = wrapper(reducer, <Add hs={hs} tags={[tag]} />);
    getByText(/bar/i);
  });

  test('renders placeholder when no tags found', () => {
    const { getByText } = wrapper(reducer, <Add hs={hs} tags={[]} />);
    getByText(/no tags found/i);
  });

  test('can toggle tag', () => {
    const { getByText } = wrapper(
      reducer,
      <>
        <Tags />
        <Add hs={hs} tags={[tag]} />
      </>
    );

    getByText(/no tags/i);

    fireEvent.click(getByText(/bar/i));

    getByText(/BAR/);

    fireEvent.click(getByText(/bar/));

    getByText(/no tags/i);
  });
});
