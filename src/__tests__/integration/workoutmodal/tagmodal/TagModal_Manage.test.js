import React from 'react';
import TagsModalManage from '../../../../components/dash/workoutmodal/optionsmenu/options/tagsoption/tagsmodal/manage/TagsModalManage';
import { FETCH_TAGS_SUCCESS } from '../../../../actions/tagsActions';
import { cleanup } from '@testing-library/react';
import wrapper from '../../../../__testUtils__/wrapper';
import Modal from 'react-modal';
import { reducer } from '../../../../reducers/index';

describe('tag modal manage functionality', () => {
  Modal.setAppElement(document.createElement('div'));
  afterEach(() => {
    cleanup;
    jest.clearAllMocks();
  });

  test('modal displays default state if no tags', () => {
    const { queryByText } = wrapper(reducer, <TagsModalManage />);
    expect(queryByText(/no tags found/i)).toBeTruthy();
  });

  test('modal displays tag if tag found', () => {
    const { getByText, store } = wrapper(reducer, <TagsModalManage />);

    store.dispatch({
      type: FETCH_TAGS_SUCCESS,
      payload: [{ content: 'content', _id: 1 }]
    });

    expect(getByText(/content/i)).toBeTruthy();
  });

  test('can edit tag name', () => {
    const { getByText, store } = wrapper(reducer, <TagsModalManage />);

    store.dispatch({
      type: FETCH_TAGS_SUCCESS,
      payload: [{ content: 'content', _id: 1 }]
    });

    expect(getByText(/content/i)).toBeTruthy();

    store.dispatch({
      type: FETCH_TAGS_SUCCESS,
      payload: [{ content: 'changed', _id: 1 }]
    });

    expect(getByText(/changed/i)).toBeTruthy();
  });
});
