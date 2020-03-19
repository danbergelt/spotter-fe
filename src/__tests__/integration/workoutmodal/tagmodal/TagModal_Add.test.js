import React from 'react';
import { ADD_TAGS } from '../../../../actions/tagsActions';
import { DELETE_TAG, UPDATE_TAG } from '../../../../actions/workoutActions';
import TagsModalAdd from '../../../../components/dash/workoutmodal/actions/tagsoption/tagsmodal/add/TagsModalAdd';
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
});
