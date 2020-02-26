import React from 'react';
import { ADD_TAGS } from '../../../../actions/tagsActions';
import { DELETE_TAG, UPDATE_TAG } from '../../../../actions/workoutActions';
import TagsModalAdd from '../../../../components/dash/workoutmodal/optionsmenu/options/tagsoption/tagsmodal/add/TagsModalAdd';
import WorkoutTags from '../../../../components/dash/workoutmodal/data/workouttags/WorkoutTags';
import { cleanup, fireEvent, wait } from '@testing-library/react';
import wrapper from '../../../../__testUtils__/wrapper';
import Modal from 'react-modal';
import { reducer } from '../../../../reducers/index';

describe('add tag to workout functionality', () => {
  afterEach(cleanup);
  Modal.setAppElement(document.createElement('div'));

  test('add view shows initial state with no tags', async () => {
    const { getByText } = wrapper(reducer, <TagsModalAdd />);
    expect(getByText(/no tags found/i)).toBeTruthy();
  });

  test('add view shows state with tags', () => {
    const { getByText, store } = wrapper(reducer, <TagsModalAdd />);
    store.dispatch({
      type: ADD_TAGS,
      payload: [{ content: 'content', _id: 1 }]
    });
    expect(getByText(/content/i)).toBeTruthy();
  });

  test('can toggle tag', () => {
    const Wrapper = props => {
      return <>{props.children}</>;
    };

    const { getByText, store, queryByTestId, getByTestId } = wrapper(
      reducer,
      <Wrapper>
        <WorkoutTags />
        <TagsModalAdd />
      </Wrapper>
    );

    store.dispatch({
      type: ADD_TAGS,
      payload: [{ content: 'content', _id: 1 }]
    });

    expect(getByText(/content/i)).toBeTruthy();
    fireEvent.click(getByText(/content/i));
    expect(queryByTestId(/mapped-tag/i)).toBeTruthy();
    fireEvent.click(getByTestId(/tag-to-add/i));
    expect(queryByTestId(/mapped-tag/i)).toBeFalsy();
  });

  test('deleted tag cascades to workout', async () => {
    const Wrapper = props => {
      return <>{props.children}</>;
    };

    const { getByTestId, store, queryByTestId } = wrapper(
      reducer,
      <Wrapper>
        <WorkoutTags />
        <TagsModalAdd />
      </Wrapper>
    );

    store.dispatch({
      type: ADD_TAGS,
      payload: [{ content: 'content', _id: 1 }]
    });

    expect(getByTestId(/tag-to-add/i)).toBeTruthy();
    fireEvent.click(getByTestId(/tag-to-add/i));
    expect(queryByTestId(/mapped-tag/i)).toBeTruthy();

    store.dispatch({
      type: DELETE_TAG,
      payload: { content: 'content', _id: 1 }
    });

    await wait(() => expect(queryByTestId(/mapped-tag/i)).toBeFalsy());
  });

  test('updated tag cascades to workout', async () => {
    const Wrapper = props => {
      return <>{props.children}</>;
    };

    const { getByTestId, store, queryByTestId, queryAllByText } = wrapper(
      reducer,
      <Wrapper>
        <WorkoutTags />
        <TagsModalAdd />
      </Wrapper>
    );

    store.dispatch({
      type: ADD_TAGS,
      payload: [{ content: 'content', _id: 1 }]
    });

    expect(getByTestId(/tag-to-add/i)).toBeTruthy();
    fireEvent.click(getByTestId(/tag-to-add/i));
    await wait(() => expect(queryByTestId(/mapped-tag/i)).toBeTruthy());

    store.dispatch({
      type: UPDATE_TAG,
      payload: { content: 'changed', _id: 1 }
    });

    await wait(() => expect(queryAllByText(/changed/i)).toBeTruthy());
  });
});
